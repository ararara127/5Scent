<?php

namespace App\Http\Controllers;

use App\Models\POSTransaction;
use App\Models\POSItem;
use App\Models\Product;
use Illuminate\Http\Request;

class POSController extends Controller
{
    /**
     * Create POS transaction
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'nullable|string|max:255',
            'payment_method' => 'required|in:cash,card,qris',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total_price = 0;
        $transactionItems = [];

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $subtotal = $product->price * $item['quantity'];
            $total_price += $subtotal;

            $transactionItems[] = [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ];
        }

        $transaction = POSTransaction::create([
            'total_price' => $total_price,
            'payment_method' => $validated['payment_method'],
            'customer_name' => $validated['customer_name'] ?? 'Walk-in Customer',
        ]);

        foreach ($transactionItems as $item) {
            POSItem::create([
                'pos_transaction_id' => $transaction->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json([
            'message' => 'POS transaction created',
            'transaction' => $transaction->load('items.product'),
        ], 201);
    }

    /**
     * Get transaction details
     */
    public function show($id)
    {
        $transaction = POSTransaction::with('items.product')->findOrFail($id);

        return response()->json($transaction, 200);
    }

    /**
     * Get all transactions (paginated)
     */
    public function index()
    {
        $transactions = POSTransaction::with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($transactions, 200);
    }

    /**
     * Get daily sales report
     */
    public function dailyReport(Request $request)
    {
        $date = $request->query('date', now()->format('Y-m-d'));

        $transactions = POSTransaction::whereDate('created_at', $date)
            ->with('items.product')
            ->get();

        $totalSales = $transactions->sum('total_price');
        $transactionCount = $transactions->count();

        return response()->json([
            'date' => $date,
            'total_sales' => $totalSales,
            'transaction_count' => $transactionCount,
            'transactions' => $transactions,
        ], 200);
    }

    /**
     * Get receipt for transaction
     */
    public function receipt($id)
    {
        $transaction = POSTransaction::with('items.product')->findOrFail($id);

        $receiptText = "================================\n";
        $receiptText .= "          5SCENT RECEIPT\n";
        $receiptText .= "================================\n";
        $receiptText .= "Transaction ID: " . $transaction->id . "\n";
        $receiptText .= "Date: " . $transaction->created_at->format('Y-m-d H:i:s') . "\n";
        $receiptText .= "Customer: " . $transaction->customer_name . "\n";
        $receiptText .= "================================\n";
        $receiptText .= "Item                Qty    Price\n";
        $receiptText .= "--------------------------------\n";

        foreach ($transaction->items as $item) {
            $receiptText .= $item->product->name . "  " . $item->quantity . "    Rp " . number_format($item->price * $item->quantity, 0, ',', '.') . "\n";
        }

        $receiptText .= "================================\n";
        $receiptText .= "TOTAL: Rp " . number_format($transaction->total_price, 0, ',', '.') . "\n";
        $receiptText .= "Payment: " . strtoupper($transaction->payment_method) . "\n";
        $receiptText .= "================================\n";
        $receiptText .= "Thank you for your purchase!\n";

        return response()->json([
            'receipt' => $receiptText,
        ], 200);
    }
}
