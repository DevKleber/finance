<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CartaoVencendo extends Mailable
{
    use Queueable;
    use SerializesModels;

    protected $cartao;

    /**
     * Create a new message instance.
     *
     * @param mixed $cartao
     */
    public function __construct($cartao)
    {
        $this->cartao = $cartao;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.cartaoVencendo')->subject('Seu cartão '.$this->cartao['no_cartao_credito'].' vence hoje!')->with([
            'cartao' => $this->cartao,
        ]);
    }
}
