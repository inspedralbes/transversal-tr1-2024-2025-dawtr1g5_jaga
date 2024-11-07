<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
</head>

<body>
    <h1>Editar Producto</h1>

    <form method="POST" action="{{ route('products.update', $product->id) }}">
        @csrf
        @method('PUT')
        <input type="text" name="title" value="{{ $product->title }}" required>
        <input type="text" name="description" value="{{ $product->description }}" required>
        <input type="number" name="price" value="{{ $product->price }}" step="0.01" required>
        <input type="number" name="stock" value="{{ $product->stock }}" required>
        <button type="submit">Actualitzar Producte</button>
    </form>
</body>

</html>
