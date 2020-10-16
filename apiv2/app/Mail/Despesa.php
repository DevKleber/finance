<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Despesa extends Mailable
{
    use Queueable;
    use SerializesModels;
    protected $ds_despesa;
    protected $no_pessoa;
    protected $vl_despesac;
    protected $nu_parcela;
    protected $nomeEmail;
    protected $valor;

    /**
     * Create a new message instance.
     *
     * @param mixed $ds_despesa
     * @param mixed $no_pessoa
     * @param mixed $vl_despesac
     * @param mixed $nu_parcela
     * @param mixed $nomeEmail
     * @param mixed $valor
     */
    public function __construct($ds_despesa, $no_pessoa, $vl_despesac, $nu_parcela, $nomeEmail, $valor)
    {
        $this->ds_despesa = $ds_despesa;
        $this->no_pessoa = $no_pessoa;
        $this->vl_despesac = $vl_despesac;
        $this->nu_parcela = $nu_parcela;
        $this->nomeEmail = $nomeEmail;
        $this->valor = $valor;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.pedidos')->subject('Despesa compartilhada')->with([
            'ds_despesa' => $this->ds_despesa,
            'no_pessoa' => $this->no_pessoa,
            'vl_despesac' => $this->vl_despesac,
            'nu_parcela' => $this->nu_parcela,
            'nomeEmail' => $this->nomeEmail,
            'valor' => $this->valor,
        ]);
    }
}
