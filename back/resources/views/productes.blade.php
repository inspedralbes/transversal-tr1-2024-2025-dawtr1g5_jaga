<!-- resources/views/productes.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Llista de Productes</title>
</head>
<body>
    <h1>Llista de Productes</h1>

    @if(isset($productes) && count($productes) > 0)
        <ul>
            @foreach($productes as $producte)
                <li>
                    <h2>{{ $producte['title'] }}</h2>
                    <p><strong>Preu:</strong> {{ $producte['price'] }} €</p>
                    <p><strong>Descripció:</strong> {{ $producte['description'] }}</p>
                    <p><strong>Estoc:</strong> {{ $producte['stock'] }}</p>
                </li>
            @endforeach
        </ul>
    @else
        <p>No hi ha productes disponibles.</p>
    @endif
</body>
</html>
