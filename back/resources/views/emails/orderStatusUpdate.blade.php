<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualització de l’estat de la teva comanda</title>
    <style>
        body {
            background-color: #f7f7f7;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            color: #333;
            text-align: center;
        }

        h1 {
            color: #f48c42; 
            font-size: 26px;
        }

        p {
            color: #555;
            font-size: 16px;
            text-align: center;
        }

        .status {
            background-color: #f48c42; 
            color: #fff;
            padding: 10px 20px;
            font-weight: bold;
            font-size: 20px; 
            border-radius: 10px;
            display: inline-block;
            margin-top: 20px;
            text-align: center;
        }

        .order-details {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .order-details th, .order-details td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .order-details th {
            background-color: #f2f2f2;
        }

        .total-row {
            font-weight: bold;
            background-color: #f2f2f2;
        }

        .footer {
            color: #777;
            font-size: 14px;
            text-align: center;
            margin-top: 30px;
        }

        .footer a {
            color: #f48c42; 
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .barcode-container {
            text-align: center;
            margin-top: 30px;
        }

        .barcode-container img {
            width: 250px;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🎉 Actualització de la teva comanda</h1>
        <p>Hola, <strong>{{ $order->fullname }}</strong>!</p>
        <p>La teva comanda <strong>#{{ $order->uuid }}</strong> ha canviat d’estat a:</p>

        <div class="status">{{ $order->status }}</div>

        <h2>Resum de la teva comanda</h2>
        <table class="order-details">
            <thead>
                <tr>
                    <th>Producte</th>
                    <th>Quantitat</th>
                    <th>Preu</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->orders as $orderItem)
                    <tr>
                        <td>{{ $orderItem->product->title }}</td>
                        <td style="text-align: right;">{{ $orderItem->quantity }}</td>
                        <td style="text-align: right;">€{{ number_format($orderItem->amount, 2) }}</td>
                    </tr>
                @endforeach
                <tr class="total-row">
                    <td colspan="2" style="text-align: right;">Total</td>
                    <td style="text-align: right;">€{{ number_format($order->amount, 2) }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Código de barras -->
        <div class="barcode-container">
            <p>Escaneja aquest codi de barres per a més informació de la teva comanda:</p>
            <img src="https://barcode.tec-it.com/barcode.ashx?data={{$order->uuid}}&code=Code128&translate-esc=on" alt="Codi de barres">
        </div>

        <div class="footer">
            <p>Si tens alguna pregunta o necessites més informació, pots <a href="mailto:hello@raco.com">contactar-nos</a> en qualsevol moment.</p>
        </div>
    </div>
</body>

</html>
