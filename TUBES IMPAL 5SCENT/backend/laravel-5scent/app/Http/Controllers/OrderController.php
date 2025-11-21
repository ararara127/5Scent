<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Create new order from cart
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address' => 'required|string|max:500',
            'payment_method' => 'required|in:credit_card,debit_card,qris,cod',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $total_price = collect($validated['items'])->sum(fn($item) => $item['price'] * $item['quantity']);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_price' => $total_price,
            'status' => 'pending',
            'shipping_address' => $validated['shipping_address'],
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'unpaid',
        ]);

        foreach ($validated['items'] as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load('orderDetails'),
        ], 201);
    }

    /**
     * Get user's orders
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()
            ->with('orderDetails.product', 'payment')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($orders, 200);
    }

    /**
     * Get order details
     */
    public function show($id)
    {
        $order = Order::with('orderDetails.product', 'payment', 'notifications')
            ->findOrFail($id);

        return response()->json($order, 200);
    }

    /**
     * Cancel order (only in pending/packaging status)
     */
    public function cancel($id)
    {
        $order = Order::findOrFail($id);

        if (!in_array($order->status, ['pending', 'packaging'])) {
            return response()->json([
                'message' => 'Order cannot be cancelled in current status',
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Order cancelled successfully',
            'order' => $order,
        ], 200);
    }

    /**
     * Update order status (Admin)
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,packaging,shipped,delivered,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'message' => 'Order status updated',
            'order' => $order,
        ], 200);
    }

    /**
     * Mark as delivered
     */
    public function delivered($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => 'delivered']);

        return response()->json([
            'message' => 'Order marked as delivered',
            'order' => $order,
        ], 200);
    }

    /**
     * Add tracking number
     */
    public function addTracking(Request $request, $id)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string|max:100',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'message' => 'Tracking number added',
            'order' => $order,
        ], 200);
    }
}
