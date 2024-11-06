<!-- resources/views/categories/show.blade.php -->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles de Categoría</title>
</head>
<body>
    <h1>Detalles de la Categoría: {{ $category->category }}</h1>

    <h3>Productos en esta Categoría</h3>
    <table border="1">
        <thead>
            <tr>
                <th>Nombre del Producto</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
                <tr>
                    <td>{{ $product->title }}</td>
                    <td>
                        <form action="{{ route('categories.product.remove', [$category->id, $product->id]) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('¿Estás seguro de que quieres eliminar este producto de la categoría?');">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Añadir un Producto</h3>
    <form action="{{ route('categories.product.add', $category->id) }}" method="POST">
        @csrf
        <label for="product_id">Seleccionar Producto:</label>
        <select id="product_id" name="product_id" required>
            <option value="">-- Selecciona un Producto --</option>
            @foreach($allProducts as $product)
                <option value="{{ $product->id }}">{{ $product->title }}</option>
            @endforeach
        </select>
        <button type="submit">Añadir Producto</button>
    </form>

    <a href="{{ route('categories') }}">Volver a Categorías</a>
</body>
</html>
