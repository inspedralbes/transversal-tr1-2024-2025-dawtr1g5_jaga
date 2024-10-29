<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>order ID</th>
                <th>Product ID</th>
                <th>Nom producte</th>
                <th>Quantitat</th>
                <th>Preu</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->order_id }}</td>
                    <td>{{ $product->product_id }}</td>
                    <td>{{ $product->product->title ?? 'Desconegut' }}</td>                 
                    <td>{{ $product->quantity }}</td>
                    <td>{{ $product->amount }}</td>                    
                </tr>
            @endforeach

        </tbody>
    </table>
</body>
</html>