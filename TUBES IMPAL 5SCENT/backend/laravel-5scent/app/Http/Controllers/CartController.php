<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get user's cart
     */
    public function index(Request $request)
    {
        $cart = $request->user()->cart()
            ->with('product.images')
            ->get();

        $total = $cart->sum(fn($item) => $item->product->price * $item->quantity);

        return response()->json([
            'items' => $cart,
            'total' => $total,
            'count' => $cart->count(),
        ], 200);
    }

    /**
     * Add to cart
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $existingItem = Cart::where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingItem) {
            $existingItem->increment('quantity', $validated['quantity']);
            $cartItem = $existingItem;
        } else {
            $cartItem = Cart::create([
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'item' => $cartItem->load('product'),
        ], 201);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $cartItem->update($validated);

        return response()->json([
            'message' => 'Cart item updated',
            'item' => $cartItem,
        ], 200);
    }

    /**
     * Remove from cart
     */
    public function destroy(Request $request, $id)
    {
        $cartItem = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart',
        ], 200);
    }

    /**
     * Clear cart
     */
    public function clear(Request $request)
    {
        $request->user()->cart()->delete();

        return response()->json([
            'message' => 'Cart cleared',
        ], 200);
    }
}
