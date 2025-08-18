<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactoCreado extends Mailable
{
    use Queueable, SerializesModels;

    public $datos;

    public function __construct(array $datos)
    {
        $this->datos = $datos;
    }

    public function build()
    {
        return $this->subject('[URGENTE] Nueva solicitud de contacto')
                    ->markdown('emails.contacto');
    }
}
