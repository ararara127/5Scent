# Laravel Models, Migrations & Controllers

## Database Schema

### Users Table (Laravel default with additions)

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('phone')->nullable();
    $table->text('address')->nullable();
    $table->string('profile_picture')->nullable();
    $table->boolean('is_admin')->default(false);
    $table->rememberToken();
    $table->timestamps();
});
```

### Products Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_products_table.php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->text('description');
    $table->text('notes')->nullable(); // Top, middle, base notes
    $table->string('longevity')->nullable(); // "4-6 hours", "8-12 hours", etc
    $table->enum('category', ['male', 'female', 'unisex']);
    $table->enum('time_type', ['day', 'night']); // day or night
    $table->string('image')->nullable(); // product image path
    $table->integer('stock')->default(0);
    $table->decimal('min_price', 10, 2)->default(0); // minimum price
    $table->decimal('max_price', 10, 2)->default(0); // maximum price
    $table->integer('sales_count')->default(0); // for bestsellers
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    
    $table->index(['category', 'time_type']);
    $table->index('is_active');
});
```

### Product Variants Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_product_variants_table.php
Schema::create('product_variants', function (Blueprint $table) {
    $table->id();
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->string('size'); // "30ml", "50ml"
    $table->decimal('price', 10, 2);
    $table->integer('stock')->default(0);
    $table->timestamps();
    
    $table->unique(['product_id', 'size']);
});
```

### Orders Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_orders_table.php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('restrict');
    $table->string('order_number')->unique();
    $table->enum('status', ['Pending', 'Packaging', 'Shipping', 'Delivered', 'Cancel'])->default('Pending');
    $table->text('shipping_address');
    $table->string('shipping_number')->nullable(); // JNE tracking number, etc
    $table->enum('payment_method', ['QRIS', 'COD'])->default('COD');
    $table->enum('payment_status', ['unpaid', 'paid', 'pending'])->default('pending');
    $table->string('midtrans_transaction_id')->nullable();
    $table->decimal('subtotal', 10, 2);
    $table->decimal('shipping_fee', 10, 2)->default(0);
    $table->decimal('total', 10, 2);
    $table->text('notes')->nullable();
    $table->timestamp('shipped_at')->nullable();
    $table->timestamp('delivered_at')->nullable();
    $table->timestamp('cancelled_at')->nullable();
    $table->timestamps();
    
    $table->index(['user_id', 'status']);
    $table->index('payment_status');
});
```

### Order Items Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_order_items_table.php
Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('restrict');
    $table->string('variant_size'); // "30ml", "50ml"
    $table->integer('quantity');
    $table->decimal('unit_price', 10, 2);
    $table->decimal('total', 10, 2); // quantity * unit_price
    $table->timestamps();
});
```

### Ratings Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_ratings_table.php
Schema::create('ratings', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->foreignId('order_item_id')->constrained('order_items')->onDelete('cascade');
    $table->integer('rating')->min(1)->max(5);
    $table->text('comment')->nullable();
    $table->timestamps();
    
    $table->unique(['user_id', 'product_id', 'order_item_id']);
    $table->index('product_id');
});
```

### Favorites Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_favorites_table.php
Schema::create('favorites', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->timestamps();
    
    $table->unique(['user_id', 'product_id']);
    $table->index('user_id');
});
```

### POS Transactions Table

```php
// database/migrations/YYYY_MM_DD_HHMMSS_create_pos_transactions_table.php
Schema::create('pos_transactions', function (Blueprint $table) {
    $table->id();
    $table->string('transaction_number')->unique();
    $table->json('items'); // JSON array of items
    $table->decimal('subtotal', 10, 2);
    $table->decimal('total', 10, 2);
    $table->decimal('cash_received', 10, 2);
    $table->decimal('change', 10, 2);
    $table->timestamps();
});
```

## Models

### User Model

```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'profile_picture',
        'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(Product::class, 'favorites');
    }

    public function isFavorite($productId)
    {
        return $this->favorites()->where('product_id', $productId)->exists();
    }
}
```

### Product Model

```php
// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'notes',
        'longevity',
        'category',
        'time_type',
        'image',
        'stock',
        'min_price',
        'max_price',
        'sales_count',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function averageRating()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }

    public function ratingCount()
    {
        return $this->ratings()->count();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByTimeType($query, $timeType)
    {
        return $query->where('time_type', $timeType);
    }

    public function scopeSearch($query, $term)
    {
        return $query->where('name', 'like', "%{$term}%")
                     ->orWhere('description', 'like', "%{$term}%");
    }

    public function scopeBestsellers($query, $limit = 10)
    {
        return $query->orderBy('sales_count', 'desc')->limit($limit);
    }
}
```

### ProductVariant Model

```php
// app/Models/ProductVariant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'price',
        'stock',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
```

### Order Model

```php
// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'shipping_address',
        'shipping_number',
        'payment_method',
        'payment_status',
        'midtrans_transaction_id',
        'subtotal',
        'shipping_fee',
        'total',
        'notes',
        'shipped_at',
        'delivered_at',
        'cancelled_at',
    ];

    protected $casts = [
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    const STATUS_PENDING = 'Pending';
    const STATUS_PACKAGING = 'Packaging';
    const STATUS_SHIPPING = 'Shipping';
    const STATUS_DELIVERED = 'Delivered';
    const STATUS_CANCEL = 'Cancel';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->order_number) {
                $model->order_number = 'ORDER-' . now()->format('YmdHis') . '-' . Str::random(6);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function canBeCancelled()
    {
        return $this->status === self::STATUS_PACKAGING;
    }

    public function canBeMarkedDelivered()
    {
        return $this->status === self::STATUS_SHIPPING;
    }

    public function isPaid()
    {
        return $this->payment_status === 'paid';
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
```

### OrderItem Model

```php
// app/Models/OrderItem.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'variant_size',
        'quantity',
        'unit_price',
        'total',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class, 'order_item_id');
    }
}
```

### Rating Model

```php
// app/Models/Rating.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'order_item_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }
}
```

### Favorite Model

```php
// app/Models/Favorite.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
```

### POSTransaction Model

```php
// app/Models/POSTransaction.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POSTransaction extends Model
{
    use HasFactory;

    protected $table = 'pos_transactions';

    protected $fillable = [
        'transaction_number',
        'items',
        'subtotal',
        'total',
        'cash_received',
        'change',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
```

## Copy & Paste These Commands

Run these commands in order inside your Laravel project:

```powershell
# Create models with migrations
php artisan make:model Product -m
php artisan make:model ProductVariant -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
php artisan make:model Rating -m
php artisan make:model Favorite -m
php artisan make:model POSTransaction -m

# Create controllers
php artisan make:controller AuthController
php artisan make:controller ProductController --resource
php artisan make:controller OrderController --resource
php artisan make:controller RatingController --resource
php artisan make:controller FavoriteController
php artisan make:controller PaymentController
php artisan make:controller POSController

# Create Form Requests (validation)
php artisan make:request StoreProductRequest
php artisan make:request UpdateProductRequest
php artisan make:request StoreOrderRequest
php artisan make:request UpdateOrderRequest
php artisan make:request StoreRatingRequest

# Create Resource classes (API response formatting)
php artisan make:resource ProductResource
php artisan make:resource OrderResource
php artisan make:resource RatingResource

# Create Service classes
php artisan make:class Services/PaymentService
php artisan make:class Services/OrderService
```

## Next Steps

1. Update the migration files with the schema from above
2. Create the controllers with appropriate methods
3. Set up API routes in `routes/api.php`
4. Create Form Requests for validation
5. Create Resource classes for consistent API responses
