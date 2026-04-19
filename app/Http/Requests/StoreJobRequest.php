<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'type' => 'nullable|string',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
