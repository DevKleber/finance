<table style="font-family:Trebuchet ms,Arial,sans-serif;max-width:600px;width:100%" cellspacing="0" cellpadding="0"
    border="0" align="center">
    <tbody>
        <tr style="background-color:#28262e;color:#fff;display:flex">
            <td style="padding:15px" width="50%" valign="middle">
                <span style="max-width:100%;color:#fff;font-weight: bold; text-align: center;" class="CToWUd">Finant</span>
            </td>
            <td style="color:#fff;font-size:12px;line-height:16px;padding:15px;text-align:right" width="50%"
                valign="middle" align="right"> </td>
        </tr>
        <tr>

            <td colspan="2" style="padding:20px;color:#666666">
                <h2 style="color:#333333">Olá, {{$cartao['no_pessoa']}}</h2>
                <h1>Seu cartão {{$cartao['no_cartao_credito']}} vence hoje.</h1>
                <p>
                    Valor da fatura: <strong>R$ <?php echo number_format($cartao['resumo']['valor'], 2, ',', '.'); ?></strong>
                    <br>
                    Quantidade de produtos: <strong>{{$cartao['resumo']['quantidade']}}</strong>
                </p>
            </td>
        </tr>

        <tr>
            <td colspan="2" style="color:#666;font-size:14px;line-height:20px;padding:16px 16px 0;text-align: center;">
                Faça o pagamento e corra dos juros abusivos.
            </td>
        </tr>

    </tbody>
</table>
