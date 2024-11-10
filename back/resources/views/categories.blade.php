@extends('app')

@section('content')
<!-- resources/views/categories/index.blade.php -->

<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categories</title>
</head>

<body>
    <h1>Categories</h1>

    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <h3>Afegeix una nova categoria</h3>
    <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <label for="category">Nom de la Categoria:</label>
        <input type="text" id="category" name="category" required>

        <label for="fotoURL">Imatge de la Categoria (Puja un arxiu):</label>
        <input type="file" id="fotoURL" name="fotoURL" accept="image/*" required>

        <button type="submit">Afegir Categoria</button>
    </form>

    <h3>Llista de Categories</h3>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Nom de la Categoria</th>
                <th>Foto</th>
                <th>Accions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
                <tr>
                    <td>{{ $category->id }}</td>
                    <td>{{ $category->category }}</td>
                    <td><img src="{{ asset('storage/' . $category->fotoURL) }}" alt="Foto" width="50"></td>
                    <td>
                        <a href="{{ route('categprod', $category->id) }}">Veure Detalls</a>
                        <!-- Botó d'eliminar -->
                        <form action="{{ route('categories.destroy', $category->id) }}" method="POST"
                            style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit"
                                onclick="return confirm('Estàs segur que vols eliminar aquesta categoria?');">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>

@endsection
