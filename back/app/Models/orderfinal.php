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
        'status',
    ];
}