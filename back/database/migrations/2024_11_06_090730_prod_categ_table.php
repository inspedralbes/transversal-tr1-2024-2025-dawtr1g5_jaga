<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create( "category_product", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prodID');
            $table->unsignedBigInteger('categID');

            $table->foreign('prodID')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('categID')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
