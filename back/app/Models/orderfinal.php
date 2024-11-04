<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class orderfinal extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'user_id',
        'fullname',
        'email',
        'phone',
        'gift',
        'uuid',
        'status',
    ];

    public function orders()
    {
        return $this->hasMany(Orders::class, 'order_id', 'id');
    }
}
