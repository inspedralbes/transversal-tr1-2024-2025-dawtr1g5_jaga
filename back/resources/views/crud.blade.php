@extends('app')

@section('content')
<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productes</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
</head>

<body>
    <br>
    <h2>Afegir un nou producte</h2>
    <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data">
    @csrf
    <input type="text" name="title" placeholder="Nom del Joc" required>
    <input type="text" name="description" placeholder="Descripció" required>
    <input type="number" name="price" placeholder="Preu" step="0.01" required>
    <input type="number" name="stock" placeholder="Stock" required>
    <button type="submit">Afegir un producte</button>
</form>

    <br><br>

    <h2>Llista de Productes</h2>
    <table id="productsTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Preu</th>
                <th>Descripció</th>
                <th>Stock</th>
                <th>Imatge</th>
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
                    <td><img src="{{ asset('storage/' . $product->fotoURL) }}" alt="Foto" width="50"></td>
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

    <script>
        $(document).ready(function () {
            $('#productsTable').DataTable();
        });
    </script>
</body>

</html>
@endsection
