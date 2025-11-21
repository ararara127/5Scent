<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class POSTransaction extends Model
{
    protected $table = 'pos_transaction';

    protected $fillable = [
        'total_price',
        'payment_method',
        'customer_name',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function items()
    {
        return $this->hasMany(POSItem::class, 'pos_transaction_id');
    }
}
