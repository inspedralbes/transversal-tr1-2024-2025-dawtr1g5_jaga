@extends('app')

@section('content')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comandes</title>
</head>

<body>
    <h1>Llista de Comandes</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Preu</th>
                <th>User id</th>
                <th>Estat de la comanda</th>
                <th>Desglossament de comanda</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($orders as $order)
                <tr>
                    <td>{{ $order->id }}</td>
                    <td>{{ $order->amount }}</td>
                    <td>{{ $order->user_id }}</td>
                    <td>{{ $order->status }}</td>
                    <td>
                        <a href="{{ route('comandes', $order->id) }}" class="btn btn-warning">Veure Desglossament</a>
                    </td>
                </tr>
            @endforeach

        </tbody>
    </table>

</body>

</html>

@endsection