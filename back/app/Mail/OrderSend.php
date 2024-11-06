<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderFinal;  

class OrderSend extends Mailable
{
    use Queueable, SerializesModels;

    public OrderFinal $totalOrder;
    public array $orderedProducts;

    
    public function __construct(OrderFinal $totalOrder, array $orderedProducts)
    {
        $this->totalOrder = $totalOrder;
        $this->orderedProducts = $orderedProducts;
    }

    
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Confirmation',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.OrderSend',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
