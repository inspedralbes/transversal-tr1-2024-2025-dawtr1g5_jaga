<!-- resources/views/categories/show.blade.php -->

<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalls de la Categoria</title>
</head>
<body>
    <h1>Detalls de la Categoria: {{ $category->category }}</h1>

    <h3>Productes en aquesta Categoria</h3>
    <table border="1">
        <thead>
            <tr>
                <th>Nom del Producte</th>
                <th>Accions</th>
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
                            <button type="submit" onclick="return confirm('Estàs segur que vols eliminar aquest producte de la categoria?');">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Afegeix un Producte</h3>
    <form action="{{ route('categories.product.add', $category->id) }}" method="POST">
        @csrf
        <label for="product_id">Selecciona un Producte:</label>
        <select id="product_id" name="product_id" required>
            <option value="">-- Selecciona un Producte --</option>
            @foreach($allProducts as $product)
                <option value="{{ $product->id }}">{{ $product->title }}</option>
            @endforeach
        </select>
        <button type="submit">Afegir Producte</button>
    </form>

    <a href="{{ route('categories') }}">Tornar a Categories</a>
</body>
</html>