<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'stock',
        // 'url',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product', 'prodID', 'categID');
    }
    public function orders()
    {
        return $this->hasMany(Orders::class);
    }

}
