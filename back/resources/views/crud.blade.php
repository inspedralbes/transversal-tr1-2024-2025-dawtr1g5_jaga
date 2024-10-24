@extends('app')

@section('content')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>

<body>
    <h1>Llista de Productes</h1>

    <h2>Afegeix un nou producte</h2>
    <form method="POST" action="{{ route('products.store') }}">
        @csrf
        <input type="text" name="title" placeholder="Nom del Joc" required>
        <input type="text" name="description" placeholder="Descripció" required>
        <input type="number" name="price" placeholder="Preu" step="0.01" required>
        <input type="number" name="stock" placeholder="Stock" required>
        <button type="submit">Agregar Producto</button>
    </form>

    <h2>Lista de Productos</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Preu</th>
                <th>Descripció</th>
                <th>Stock</th>
                <th>Accions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->title }}</td>
                    <td>{{ $product->price }}</td>
                    <td>{{ $product->description }}</td>
                    <td>{{ $product->stock }}</td>
                    <td>
                        <form method="POST" action="{{ route('products.destroy', $product->id) }}">
                            @method('DELETE')
                            @csrf
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                        <a href="{{ route('products.edit', $product->id) }}" class="btn btn-warning">Editar</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
@endsection