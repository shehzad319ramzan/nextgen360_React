<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRedirectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'from_path' => 'required|string',
            'to_path' => 'required|string',
            'type' => 'nullable|in:301,302',
        ];
    }
}
