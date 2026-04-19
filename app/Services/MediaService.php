<?php

namespace App\Services;

use App\Repositories\Interfaces\MediaRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Exception;

class MediaService
{
    protected MediaRepositoryInterface $mediaRepo;

    public function __construct(MediaRepositoryInterface $mediaRepo)
    {
        $this->mediaRepo = $mediaRepo;
    }

    public function upload(UploadedFile $file): array
    {
        $allowed = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg', 'pdf'];
        $extension = strtolower($file->getClientOriginalExtension());

        if (!in_array($extension, $allowed)) {
            throw new Exception('File type not allowed', 400);
        }

        if ($file->getSize() > 10 * 1024 * 1024) {
            throw new Exception('File size exceeds 10MB limit', 400);
        }

        return $this->mediaRepo->upload($file);
    }

    public function listFiles(): array
    {
        return $this->mediaRepo->all();
    }

    public function delete(string $filename): void
    {
        $this->mediaRepo->delete($filename);
    }
}
