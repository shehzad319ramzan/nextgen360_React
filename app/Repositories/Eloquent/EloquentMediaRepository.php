<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Interfaces\MediaRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class EloquentMediaRepository implements MediaRepositoryInterface
{
    /**
     * The storage disk and directory for uploads.
     */
    private const DISK = 'public';
    private const DIRECTORY = 'uploads';

    public function upload($file)
    {
        $timestamp = now()->timestamp;
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $baseName = pathinfo($originalName, PATHINFO_FILENAME);
        $filename = $timestamp . '_' . $baseName . '.' . $extension;

        $file->storeAs(self::DIRECTORY, $filename, self::DISK);

        return [
            'url' => Storage::disk(self::DISK)->url(self::DIRECTORY . '/' . $filename),
            'filename' => $filename,
            'size' => $file->getSize(),
        ];
    }

    public function all()
    {
        $files = Storage::disk(self::DISK)->files(self::DIRECTORY);
        $results = [];

        foreach ($files as $file) {
            $results[] = [
                'filename' => basename($file),
                'url' => Storage::disk(self::DISK)->url($file),
                'size' => Storage::disk(self::DISK)->size($file),
                'last_modified' => Storage::disk(self::DISK)->lastModified($file),
            ];
        }

        return $results;
    }

    public function delete($filename)
    {
        $path = self::DIRECTORY . '/' . $filename;

        if (Storage::disk(self::DISK)->exists($path)) {
            Storage::disk(self::DISK)->delete($path);

            return true;
        }

        return false;
    }
}
