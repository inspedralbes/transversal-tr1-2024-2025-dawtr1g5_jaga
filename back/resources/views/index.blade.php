@extends('app')

@section('content')
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
    </head>

<body>
    <h1>Llista de Comandes</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Preu</th>
                <th>User id</th>
                <th>Nom i cognoms</th>
                <th>Correu electrònic</th>
                <th>Telèfon</th>
                <th>Regal</th>
                <th>uuid</th>
                <th>Estat de la comanda</th>
                <th>Desglossament de comanda</th>
                <th>Canviar estat de comanda</th>
            </tr>
        </thead>
        <tbody>
                @foreach ($orders as $order)
                    <tr>
                        <td>{{ $order->id }}</td>
                        <td>{{ $order->amount }}</td>
                        <td>{{ $order->user_id }}</td>
                        <td>{{ $order->fullname }}</td>
                        <td>{{ $order->email }}</td>
                        <td>{{ $order->phone }}</td>
                        <td>{{ $order->gift ? 'Si' : 'No' }}</td>
                        <td>{{ $order->uuid }}</td>
                        <td>{{ $order->status }}</td>
                        <td>
                            <a href="{{ route('comandes.show', $order->id) }}" class="btn btn-warning">Veure Desglossament</a>
                        </td>
                        <td>
                            <form action="{{ route('comandes.updateStatus', $order->id) }}" method="POST">
                                @csrf
                                <button type="submit" name="status" value="pendent" class="btn btn-primary">Pendent</button>
                                <button type="submit" name="status" value="preparat" class="btn btn-success">Preparat</button>
                                <button type="submit" name="status" value="rebutjat" class="btn btn-danger">Rebutjat</button>
                                <button type="submit" name="status" value="entregat" class="btn btn-info">Entregat</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
    </table>

</body>

</html>
<script>
    $(document).ready(function() {
        $('table').DataTable();
    });
</script>
@endsection