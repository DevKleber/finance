<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Facades\Image;

class Arquivo extends Model
{
    public static function saveFileQuality($file, $folder, $quality)
    {
        return self::uploadQuality($file, $folder, $quality);
    }

    public static function saveFileCrop($file, $folder)
    {
        return self::create(self::upload($file, $folder));
    }

    public static function uploadQuality($file, $folder, $quality)
    {
        if (null == $folder) {
            $folder = 'default';
        }
        $fileSize = $file->getSize() / 1024;
        if ($fileSize > 1024) {
            throw new Exception('Imagem não pode ser maior do que 1MB');
        }

        if (!self::formatIsImage($file)) {
            throw new Exception('Formato inválido');
        }

        $miniatura = self::reduceQuality($file, $folder, $quality);

        $dados['caminho'] = $miniatura;
        $dados['no_arquivo'] = basename($miniatura);

        return $dados;
    }
    public static function uploadFile($file, $folder = 'extrato'){

        $size = $file->getSize();

        $path = $file->store($folder);
        if (!$path) {
            return false;
        }

        $dados['no_arquivo'] = basename($path);
        $dados['qt_tamanho'] = $file->getSize();
        $dados['tp_arquivo'] = $file->getClientOriginalExtension();

        return $dados;
    }

    public static function upload($file, $folder)
    {
        if (null == $folder) {
            $folder = 'default';
        }
        $size = $file->getSize();

        if (!self::formatIsImage($file)) {
            throw new Exception('Formato inválido');
        }

        $path = $file->store($folder);
        $miniatura = self::crop($file, $path, '75');
        if (!$path) {
            return false;
        }

        $dados['mm_caminho_miniatura'] = $miniatura;
        $dados['mm_caminho'] = 'public/storage/'.$path;
        $dados['no_arquivo_miniatura'] = basename($miniatura);
        $dados['no_arquivo'] = basename($path);
        $dados['qt_tamanho'] = $file->getSize();
        $dados['tp_arquivo'] = $file->getClientOriginalExtension();

        return $dados;
    }

    public static function formatIsImage($request)
    {
        $type = current(explode('/', $request->getMimeType()));
        if ('image' != $type) {
            return false;
        }

        return true;
    }

    private static function reduceQuality($file, $folder, $quality = '')
    {
        $type = current(explode('/', $file->getMimeType()));
        if ('image' != $type) {
            return false;
        }
        $extension = $file->getClientOriginalExtension();
        $nome = \Str::random(40);

        $name = storage_path().'/app/public/'.$folder.'/'.$nome.'.'.$extension;

        if (Image::make($file)->save($name, $quality)) {
            return 'storage/'.$folder.'/'.$nome.'.'.$extension;
        }

        return false;
    }

    private static function crop($file, $path, $quality = '')
    {
        $type = current(explode('/', $file->getMimeType()));
        if ('image' != $type) {
            return false;
        }
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $path = str_replace(".{$extension}", '', $path);
        $name = storage_path().'/app/public/'.$path.'_min.'.$extension;

        if (Image::make($file)->fit(200, 200)->save($name, $quality)) {
            return 'storage/'.$path.'_min.'.$extension;
        }

        return false;
    }
}
