<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <style>
        body {
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: sans-serif;
            color: #1a1a1a;
        }

        .containDiv {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            width: 100%;
            box-sizing: border-box;
            padding: 5px;
        }
        
        .codeBar {
            width: 70%;
        }
        
        @media screen and (min-width: 600px) {
            .codeBar {
                width: 400px;
            }
            
            .containDiv {
                border: 1px solid rgb(218, 218, 218);
                border-radius: 10px;
                width: 50%;
                padding: 10px;
            }
        }
    </style>
    <div class="containDiv">
        <h1 style="margin: 20px 0 0 0;">Order sent</h1>
        <!-- <p>Hello <span></span><br>Your order #{{$totalOrder->uuid}} has been received</p> -->
        <p style="text-align: center;">Hello <span style="font-weight: 700; font-size: 20px;">{{$totalOrder->fullname}}</span><br>Your order #{{$totalOrder->uuid}} has been received</p>
        <p>Scan this barcode:</p>
        <img src="https://barcode.tec-it.com/barcode.ashx?data={{$totalOrder->uuid}}&code=Code128&translate-esc=on"
            alt="Barcode Scan" class="codeBar">
        <img src="https://i.ibb.co/47NWgwC/lettermark.png" width="130px" style="margin: 30px 0 10px 0;">
    </div>
</body>

</html>