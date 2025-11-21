<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Get user's wishlist
     */
    public function index(Request $request)
    {
        $wishlist = $request->user()->wishlist()
            ->with('product.images')
            ->paginate(12);

        return response()->json($wishlist, 200);
    }

    /**
     * Toggle product in wishlist
     */
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $existingWishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingWishlist) {
            $existingWishlist->delete();
            return response()->json([
                'message' => 'Removed from wishlist',
                'added' => false,
            ], 200);
        }

        $wishlist = Wishlist::create([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'],
        ]);

        return response()->json([
            'message' => 'Added to wishlist',
            'added' => true,
            'wishlist' => $wishlist,
        ], 201);
    }

    /**
     * Check if product is in wishlist
     */
    public function isInWishlist(Request $request, $productId)
    {
        $inWishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->exists();

        return response()->json([
            'in_wishlist' => $inWishlist,
        ], 200);
    }
}
