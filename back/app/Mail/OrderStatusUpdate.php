<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderFinal;

class OrderStatusUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     */
    public function __construct(OrderFinal $order)
    {
        $this->order = $order;
    }

    /**
     * Get the message envelope.
     */
    public function envelope()
    {
        return [
            'subject' => 'Actualització de l’estat de la teva comanda',
        ];
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return [
            'view' => 'emails.orderStatusUpdate', // Vista del correo
        ];
    }
}
