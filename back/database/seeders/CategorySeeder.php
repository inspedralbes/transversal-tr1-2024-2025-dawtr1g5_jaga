<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Category;
use App\Models\Product;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/products.json');
        $data = json_decode($json);
        // Itera los productos
        foreach( $data as $product ) {
            // Itera las categorias
            foreach ($product->categories as $categoryName) {
                Category::create([
                    'category' => $categoryName,
                ]);
            }
        }
    }
}
