<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Create new rating
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $existingRating = Rating::where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingRating) {
            $existingRating->update($validated);
            $rating = $existingRating;
            $message = 'Rating updated';
        } else {
            $rating = Rating::create([
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
                'rating' => $validated['rating'],
                'review' => $validated['review'] ?? null,
            ]);
            $message = 'Rating created';
        }

        return response()->json([
            'message' => $message,
            'rating' => $rating->load('user'),
        ], 201);
    }

    /**
     * Get ratings for a product
     */
    public function byProduct($productId)
    {
        $ratings = Rating::where('product_id', $productId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $averageRating = Rating::where('product_id', $productId)
            ->avg('rating');

        return response()->json([
            'ratings' => $ratings,
            'average_rating' => round($averageRating, 1),
            'total_ratings' => Rating::where('product_id', $productId)->count(),
        ], 200);
    }

    /**
     * Get user's ratings
     */
    public function userRatings(Request $request)
    {
        $ratings = $request->user()->ratings()
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($ratings, 200);
    }

    /**
     * Delete rating
     */
    public function destroy($id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();

        return response()->json([
            'message' => 'Rating deleted',
        ], 200);
    }
}
