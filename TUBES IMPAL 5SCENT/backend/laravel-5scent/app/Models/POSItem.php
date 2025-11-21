<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class POSItem extends Model
{
    protected $table = 'pos_item';

    protected $fillable = [
        'pos_transaction_id',
        'product_id',
        'quantity',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function transaction()
    {
        return $this->belongsTo(POSTransaction::class, 'pos_transaction_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
