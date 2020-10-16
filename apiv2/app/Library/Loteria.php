<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Loteria
{
    public static function getNumerosByConcursoLoteriaFederal($concurso)
    {
        $numeroConcurso = !$concurso ? '' : "&concurso={$concurso}";
        $url = "http://loterias.caixa.gov.br/wps/portal/loterias/landing/federal/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0MzIAKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAYe29yM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0K0L710QUKB6OH80004/res/id=buscaResultado/c=cacheLevelPage/=/?timestampAjax=1597063956999{$numeroConcurso}";

        return Http::get($url);
    }
}
