<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>Actualització de l’estat de la teva comanda</title>
</head>
<body>
    <h1>Hola, {{ $order->fullname }}</h1>
    <p>La teva comanda amb número <strong>#{{ $order->uuid }}</strong> ha canviat d’estat.</p>
    <p>Nou estat: <strong>{{ $order->status }}</strong></p>  

    <div style="text-align: center; margin-top: 20px;">
        <p>Escaneja aquest codi de barres per a més informació de la teva comanda:</p>
        <img src="https://barcode.tec-it.com/barcode.ashx?data={{$order->uuid}}&code=Code128&translate-esc=on" alt="Codi de barres" style="margin-top: 10px; width: 250px;">
    </div>
    
    <p>Gràcies per confiar en nosaltres!</p>
</body>
</html>
