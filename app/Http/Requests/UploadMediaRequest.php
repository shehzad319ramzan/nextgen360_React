<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:jpeg,jpg,png,gif,webp,svg,pdf|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'No file uploaded',
            'file.mimes' => 'Allowed: jpeg, jpg, png, gif, webp, svg, pdf',
            'file.max' => 'File size exceeds 10MB limit',
        ];
    }
}
