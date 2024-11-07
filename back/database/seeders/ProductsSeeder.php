<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/products.json');
        $data = json_decode($json);

        foreach( $data as $productData ) {
            
            $product = Product::create([
                'id' => $productData->id,
                'title' => $productData->title,
                'description' => $productData->description,
                'price' => $productData->price,
                'stock' => $productData->stock,
            ]);

            foreach ($productData->categories as $categoryName) {
                $category = Category::firstOrCreate([
                    'category' => $categoryName
                ]);

                // Conecta las tablas de category y de product
                $product->categories()->attach($category->id);
            }
        }
    }
}
