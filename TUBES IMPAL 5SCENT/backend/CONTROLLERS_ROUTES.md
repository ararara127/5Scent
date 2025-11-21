# Laravel Controllers & API Routes

## Auth Controller

```php
// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'phone' => $request->user()->phone,
                'address' => $request->user()->address,
                'profile_picture' => $request->user()->profile_picture,
                'is_admin' => $request->user()->is_admin,
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if ($validated['name'] ?? null) {
            $user->name = $validated['name'];
        }
        if ($validated['phone'] ?? null) {
            $user->phone = $validated['phone'];
        }
        if ($validated['address'] ?? null) {
            $user->address = $validated['address'];
        }
        if ($validated['password'] ?? null) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
            ],
        ]);
    }
}
```

## Product Controller

```php
// app/Http/Controllers/ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::active();

        // Filter by category
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Filter by time type
        if ($request->has('time_type')) {
            $query->byTimeType($request->time_type);
        }

        // Search
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Bestsellers
        if ($request->has('bestsellers')) {
            $query->bestsellers($request->input('bestsellers', 10));
        }

        $products = $query->paginate(12);

        return response()->json([
            'data' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'last_page' => $products->lastPage(),
            ],
        ]);
    }

    public function show($id)
    {
        $product = Product::with('variants', 'ratings')->findOrFail($id);

        return response()->json([
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'notes' => $product->notes,
                'longevity' => $product->longevity,
                'category' => $product->category,
                'time_type' => $product->time_type,
                'image' => $product->image,
                'stock' => $product->stock,
                'min_price' => $product->min_price,
                'max_price' => $product->max_price,
                'variants' => $product->variants->map(fn($v) => [
                    'id' => $v->id,
                    'size' => $v->size,
                    'price' => $v->price,
                    'stock' => $v->stock,
                ]),
                'ratings' => [
                    'average' => $product->averageRating(),
                    'count' => $product->ratingCount(),
                    'reviews' => $product->ratings->map(fn($r) => [
                        'id' => $r->id,
                        'user_name' => $r->user->name,
                        'rating' => $r->rating,
                        'comment' => $r->comment,
                        'created_at' => $r->created_at,
                    ]),
                ],
            ],
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->user()?->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:male,female,unisex',
            'time_type' => 'required|in:day,night',
            'notes' => 'nullable|string',
            'longevity' => 'nullable|string',
            'image' => 'nullable|string',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create([
            ...$validated,
            'slug' => \Str::slug($validated['name']),
        ]);

        return response()->json(['product' => $product], 201);
    }

    public function update(Request $request, Product $product)
    {
        if (!$request->user()?->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|in:male,female,unisex',
            'time_type' => 'nullable|in:day,night',
            'notes' => 'nullable|string',
            'longevity' => 'nullable|string',
            'image' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = \Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json(['product' => $product]);
    }

    public function destroy(Request $request, Product $product)
    {
        if (!$request->user()?->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
```

## Order Controller

```php
// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|in:QRIS,COD',
            'items' => 'required|array',
            'items.*.variant_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $subtotal = 0;
        $items = [];

        foreach ($validated['items'] as $item) {
            $variant = \App\Models\ProductVariant::findOrFail($item['variant_id']);
            $lineTotal = $variant->price * $item['quantity'];
            $subtotal += $lineTotal;

            $items[] = [
                'product_id' => $variant->product_id,
                'variant_size' => $variant->size,
                'quantity' => $item['quantity'],
                'unit_price' => $variant->price,
                'total' => $lineTotal,
            ];
        }

        $shippingFee = 10000; // Hardcoded or from config
        $total = $subtotal + $shippingFee;

        $order = Order::create([
            'user_id' => $request->user()->id,
            'shipping_address' => $validated['shipping_address'],
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'pending',
            'subtotal' => $subtotal,
            'shipping_fee' => $shippingFee,
            'total' => $total,
            'status' => Order::STATUS_PENDING,
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                ...$item,
            ]);
        }

        // If QRIS, create payment transaction with Midtrans
        if ($validated['payment_method'] === 'QRIS') {
            // Dispatch payment creation job or call PaymentService
            // For now, mark as pending
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'total' => $order->total,
                'payment_method' => $order->payment_method,
            ],
        ], 201);
    }

    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id && !$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'shipping_address' => $order->shipping_address,
                'shipping_number' => $order->shipping_number,
                'payment_method' => $order->payment_method,
                'payment_status' => $order->payment_status,
                'subtotal' => $order->subtotal,
                'shipping_fee' => $order->shipping_fee,
                'total' => $order->total,
                'items' => $order->items->map(fn($item) => [
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'variant_size' => $item->variant_size,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total' => $item->total,
                ]),
                'created_at' => $order->created_at,
                'shipped_at' => $order->shipped_at,
                'delivered_at' => $order->delivered_at,
            ],
        ]);
    }

    public function index(Request $request)
    {
        $query = $request->user()->orders();

        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        $orders = $query->latest()->paginate(10);

        return response()->json([
            'data' => $orders->items(),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'total' => $orders->total(),
                'last_page' => $orders->lastPage(),
            ],
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:Pending,Packaging,Shipping,Delivered,Cancel',
            'shipping_number' => 'nullable|string',
        ]);

        $order->status = $validated['status'];

        if ($validated['status'] === Order::STATUS_SHIPPING && $request->has('shipping_number')) {
            $order->shipping_number = $validated['shipping_number'];
            $order->shipped_at = now();
        }

        if ($validated['status'] === Order::STATUS_DELIVERED) {
            $order->delivered_at = now();
        }

        if ($validated['status'] === Order::STATUS_CANCEL) {
            $order->cancelled_at = now();
        }

        $order->save();

        return response()->json(['message' => 'Order status updated', 'order' => $order]);
    }

    public function cancel(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!$order->canBeCancelled()) {
            return response()->json(['message' => 'Order cannot be cancelled at this status'], 400);
        }

        $order->status = Order::STATUS_CANCEL;
        $order->cancelled_at = now();
        $order->save();

        return response()->json(['message' => 'Order cancelled successfully']);
    }

    public function markDelivered(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!$order->canBeMarkedDelivered()) {
            return response()->json(['message' => 'Order cannot be marked as delivered'], 400);
        }

        $order->status = Order::STATUS_DELIVERED;
        $order->delivered_at = now();
        $order->save();

        return response()->json(['message' => 'Order marked as delivered']);
    }
}
```

## Rating Controller

```php
// app/Http/Controllers/RatingController.php
namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_item_id' => 'required|integer|exists:order_items,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $orderItem = OrderItem::findOrFail($validated['order_item_id']);

        // Check if user is owner of the order
        if ($orderItem->order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if order is delivered
        if ($orderItem->order->status !== 'Delivered') {
            return response()->json(['message' => 'Can only rate delivered orders'], 400);
        }

        // Check if already rated
        if ($orderItem->rating) {
            return response()->json(['message' => 'This item already has a rating'], 400);
        }

        $rating = Rating::create([
            'user_id' => $request->user()->id,
            'product_id' => $orderItem->product_id,
            'order_item_id' => $orderItem->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Rating created successfully',
            'rating' => $rating,
        ], 201);
    }

    public function getProductRatings($productId)
    {
        $ratings = Rating::where('product_id', $productId)
            ->with('user')
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => $ratings->items(),
            'pagination' => [
                'current_page' => $ratings->currentPage(),
                'total' => $ratings->total(),
                'last_page' => $ratings->lastPage(),
            ],
        ]);
    }
}
```

## Favorite Controller

```php
// app/Http/Controllers/FavoriteController.php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function toggle(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        if ($request->user()->isFavorite($productId)) {
            $request->user()->favorites()->detach($productId);
            return response()->json(['message' => 'Removed from favorites', 'is_favorite' => false]);
        } else {
            $request->user()->favorites()->attach($productId);
            return response()->json(['message' => 'Added to favorites', 'is_favorite' => true]);
        }
    }

    public function index(Request $request)
    {
        $favorites = $request->user()->favorites()->paginate(12);

        return response()->json([
            'data' => $favorites->items(),
            'pagination' => [
                'current_page' => $favorites->currentPage(),
                'total' => $favorites->total(),
                'last_page' => $favorites->lastPage(),
            ],
        ]);
    }
}
```

## POS Controller

```php
// app/Http/Controllers/POSController.php
namespace App\Http\Controllers;

use App\Models\POSTransaction;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class POSController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.variant_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'cash_received' => 'required|numeric|min:0',
        ]);

        $subtotal = 0;
        $items = [];

        foreach ($validated['items'] as $item) {
            $variant = ProductVariant::with('product')->findOrFail($item['variant_id']);
            $lineTotal = $variant->price * $item['quantity'];
            $subtotal += $lineTotal;

            $items[] = [
                'product_name' => $variant->product->name,
                'variant_size' => $variant->size,
                'quantity' => $item['quantity'],
                'unit_price' => $variant->price,
                'total' => $lineTotal,
            ];
        }

        $total = $subtotal;
        $change = $validated['cash_received'] - $total;

        if ($change < 0) {
            return response()->json(['message' => 'Insufficient cash'], 400);
        }

        $transaction = POSTransaction::create([
            'items' => $items,
            'subtotal' => $subtotal,
            'total' => $total,
            'cash_received' => $validated['cash_received'],
            'change' => $change,
        ]);

        return response()->json([
            'message' => 'POS transaction created',
            'transaction' => $transaction,
            'receipt_data' => [
                'transaction_number' => $transaction->transaction_number,
                'date_time' => $transaction->created_at,
                'items' => $transaction->items,
                'subtotal' => $transaction->subtotal,
                'total' => $transaction->total,
                'cash_received' => $transaction->cash_received,
                'change' => $transaction->change,
            ],
        ], 201);
    }

    public function getReceipt($id)
    {
        $transaction = POSTransaction::findOrFail($id);

        return response()->json([
            'receipt_data' => [
                'transaction_number' => $transaction->transaction_number,
                'date_time' => $transaction->created_at,
                'items' => $transaction->items,
                'subtotal' => $transaction->subtotal,
                'total' => $transaction->total,
                'cash_received' => $transaction->cash_received,
                'change' => $transaction->change,
            ],
        ]);
    }
}
```

## API Routes Configuration

```php
// routes/api.php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\POSController;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Products (public)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/products/{product}/ratings', [RatingController::class, 'getProductRatings']);

// POS (public for now)
Route::post('/pos/transactions', [POSController::class, 'store']);
Route::get('/pos/receipt/{id}', [POSController::class, 'getReceipt']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::patch('/auth/profile', [AuthController::class, 'updateProfile']);

    // Products (admin only)
    Route::post('/products', [ProductController::class, 'store']);
    Route::patch('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Orders
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
    Route::patch('/orders/{order}/delivered', [OrderController::class, 'markDelivered']);

    // Admin: Update order status
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->middleware('admin');

    // Ratings
    Route::post('/ratings', [RatingController::class, 'store']);

    // Favorites
    Route::post('/favorites/{product}', [FavoriteController::class, 'toggle']);
    Route::get('/favorites', [FavoriteController::class, 'index']);

    // Payments (Midtrans)
    Route::post('/payments/create', [PaymentController::class, 'createPayment']);
    Route::post('/payments/webhook', [PaymentController::class, 'handleWebhook']);
});
```

## Middleware for Admin

```php
// app/Http/Middleware/IsAdmin.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
```

Register in `app/Http/Kernel.php`:

```php
protected $routeMiddleware = [
    // ... other middleware
    'admin' => \App\Http\Middleware\IsAdmin::class,
];
```
