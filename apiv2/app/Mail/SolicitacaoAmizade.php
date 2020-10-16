<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SolicitacaoAmizade extends Mailable
{
    use Queueable;
    use SerializesModels;
    protected $no_pessoa;

    /**
     * Create a new message instance.
     *
     * @param mixed $no_pessoa
     */
    public function __construct($no_pessoa)
    {
        $this->no_pessoa = $no_pessoa;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.solicitacaoAmizade')->subject('Solicitação de amizade')->with([
            'no_pessoa' => $this->no_pessoa,
        ]);
    }
}
