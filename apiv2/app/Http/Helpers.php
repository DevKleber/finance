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
}
