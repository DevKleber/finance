<?php

class Helpers
{
    public static function convertdateBr2DB($date)
    {
        if (empty($date)) {
            return null;
        }
        $arDate = explode('/', $date);
        if (count($arDate) <= 1) {
            return $date;
        }

        return date("{$arDate[2]}-{$arDate[1]}-{$arDate[0]}");

        return date('Y-m-d', strtotime(str_replace('-', '/', $date)));
    }

    public static function convertdateBr2DBTs($date)
    {
        return date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $date)));
    }

    public static function removerVazio($controler, $request)
    {
        foreach ($request as $key => $value) {
            if (!empty($value)) {
                $tipo = substr($key, 0, 2);
                $controler->{$key} = $value;
                if ('dt' == $tipo) {
                    $controler->{$key} = Helpers::convertdateBr2DB($value);
                }
            }
        }

        return $controler;
    }

    public static function convertDateWithoutSeparatorToDatabase($date)
    {
        $exOpcao1 = explode('-', $date);
        $exOpcao2 = explode('/', $date);
        if (count($exOpcao1) > 1) {
            return $date;
        }
        if (count($exOpcao2) > 1) {
            return date('Y-m-d', strtotime(str_replace('/', '-', $date)));
        }

        return substr($date, 4, 4).'-'.substr($date, 2, 2).'-'.substr($date, 0, 2);
    }

    public static function convertdateWithSeparatorToDatabase($date)
    {
        $exOpcao1 = explode('-', $date);
        $exOpcao2 = explode('/', $date);
        if (count($exOpcao1) <= 1 and count($exOpcao2) <= 1) {
            return substr($date, 4, 4).'-'.substr($date, 2, 2).'-'.substr($date, 0, 2);
        }

        return $date;
    }

    public static function processar($controler, $request)
    {
        foreach ($request as $key => $value) {
            $tipo = substr($key, 0, 2);
            $controler->{$key} = (!empty($value)) ? $value : null;
            if ('dt' == $tipo) {
                $controler->{$key} = Helpers::convertdateBr2DB($value);
            }
        }

        return $controler;
    }

    public static function processarColunas($colunas, $request)
    {
        $ar = [];
        foreach ($request as $key => $value) {
            if (in_array($key, $colunas)) {
                $tipo = substr($key, 0, 2);
                $ar[$key] = (!empty($value)) ? $value : null;
                if ('dt' == $tipo) {
                    $ar[$key] = Helpers::convertdateBr2DB($value);
                }
            }
        }

        return $ar;
    }
    public static function readCSVExtrato($csvFile, $array)
    {
        $file_handle = fopen($csvFile, 'r');
        $i = 0;
        while (!feof($file_handle)) {
            $line_of_text[] = fgetcsv($file_handle, 0, $array['delimiter']);
            $line_of_text[$i][] = '';
            $i++;
        }
        fclose($file_handle);
        return $line_of_text;
    }
    public static function justCurrency($value)
    {
        $value = str_replace('+', '', $value);
        if($value == 'Valor') {
            return $value;
        }
        if($value == '-127.98') {
            $a = $value;
        }

        $value = str_replace('R$', '', $value);
        $value = str_replace('.', '', $value);
        $value = str_replace(',', '.', $value);
        $value = str_replace('+', '', $value);
        $value = str_replace('-', '', $value);

        return (float)$value;
    }
    public static function removerCaracteresMoeda($value)
    {
        if(count(explode('-', $value)) > 1) {
            $value = str_replace('R$', '', $value);
            $value = str_replace(',', '.', $value);
            $value = str_replace(' ', '', $value);
            return (float)$value;
        }

        $value = str_replace('+', '', $value);
        if($value == 'Valor') {
            return $value;
        }

        $value = str_replace('R$', '', $value);

        return (float)$value;
    }
    public static function removerMaisDeDoisEspacos($value){
        return str_replace('  ', '', $value);
    }
}
