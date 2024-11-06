@extends('app')

@section('content')
<!-- resources/views/categories/index.blade.php -->

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categorías</title>
</head>

<body>
    <h1>Categorías</h1>

    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <h3>Añadir nueva categoría</h3>
    <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <label for="category">Nombre de la Categoría:</label>
        <input type="text" id="category" name="category" required>

        <label for="fotoURL">Imagen de la Categoría (Sube un archivo):</label>
        <input type="file" id="fotoURL" name="fotoURL" accept="image/*" required>

        <button type="submit">Añadir Categoría</button>
    </form>

    <h3>Lista de Categorías</h3>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre de la Categoría</th>
                <th>Foto</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
                <tr>
                    <td>{{ $category->id }}</td>
                    <td>{{ $category->category }}</td>
                    <td><img src="{{ asset('storage/' . $category->fotoURL) }}" alt="Foto" width="50"></td>
                    <td>
                        <a href="{{ route('categprod', $category->id) }}">Ver Detalles</a>
                        <!-- Botón de eliminar -->
                        <form action="{{ route('categories.destroy', $category->id) }}" method="POST"
                            style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit"
                                onclick="return confirm('¿Estás seguro de que quieres eliminar esta categoría?');">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>


@endsection