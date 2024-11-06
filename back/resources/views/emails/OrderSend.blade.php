<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resum de la teva comanda</title>
</head>

<body style="background-color: #f7f7f7; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Encabezado -->
        <h1 style="color: #333; text-align: center;">🎉 Gràcies per la teva compra, {{$totalOrder->fullname}}!</h1>
        
        <p style="color: #555; font-size: 16px; text-align: center;">
            La teva comanda <strong>#{{$totalOrder->uuid}}</strong> ha estat rebuda amb èxit.
        </p>
        
        <!-- Detalls de la comanda -->
        <h2 style="color: #333; font-size: 18px; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Resum de la Comanda</h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Producte</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Quantitat</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Preu</th>
        </tr>
    </thead>
    <tbody>
        @foreach($totalOrder->orders as $order)
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">{{$order->product->name}}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">{{$order->quantity}}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">€{{number_format($order->amount, 2)}}</td>
        </tr>
        @endforeach
        <tr style="font-weight: bold;">
            <td colspan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">€{{number_format($totalOrder->amount, 2)}}</td>
        </tr>
    </tbody>
</table>


        <!-- Codi de barra -->
        <div style="text-align: center; margin-top: 20px;">
            <p>Escaneja aquest codi de barres per a més informació de la teva comanda:</p>
            <img src="https://barcode.tec-it.com/barcode.ashx?data={{$totalOrder->uuid}}&code=Code128&translate-esc=on" alt="Codi de barres" style="margin-top: 10px; width: 250px;">
        </div>
        
        <!-- Peu de pàgina -->
        <p style="color: #777; font-size: 14px; text-align: center; margin-top: 30px;">
            Si tens cap pregunta, posa't en contacte amb nosaltres a través de <a href="mailto:hello@raco.com" style="color: #1a73e8;">hello@raco.com</a>.
        </p>
    </div>
</body>

</html>
