<table style="font-family:Trebuchet ms,Arial,sans-serif;max-width:600px;width:100%" cellspacing="0" cellpadding="0"
    border="0" align="center">
    <tbody>
        <tr style="background-color:#28262e;display:flex">
            <td style="padding:15px" width="50%" valign="middle">
                <span style="max-width:100%" class="CToWUd">FINANCEIRO</span>
            </td>
            <td style="color:#fff;font-size:12px;line-height:16px;padding:15px;text-align:right" width="50%"
                valign="middle" align="right"> </td>
        </tr>
        <tr>
            <td colspan="2" style="padding:20px;color:#666666">
                <h2 style="color:#333333">Olá, {{$nomeEmail}}</h2>
                <h1>{{$no_pessoa}} quer dividir uma conta com você</h1>
                <h2>{{$ds_despesa}}</h2>

                <p>
                    Valor da sua parte R$ <?php echo number_format($valor, 2, ',', '.'); ?>
                    <br>
                    valor total da depesa R$<?php echo number_format($vl_despesac, 2, ',', '.'); ?><br>

                    Quantidade de parcelas {{$nu_parcela}}
                </p>
            </td>
        </tr>

        <tr>
            <td colspan="2" style="color:#666;font-size:14px;line-height:20px;padding:16px 16px 0">
                Para aceitar ou recusar acesse
                <a href="#" style="color:#000;text-decoration:underline" target="_blank">
                    FINANCE.
                </a>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-size:14px;padding:8px 16px 16px" align="left"> <a href="#"
                    style="color:#000;text-decoration:none" target="_blank">
                </a> </td>
        </tr>
    </tbody>
</table>
