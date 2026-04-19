<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'client' => 'nullable|string',
            'category' => 'nullable|string',
            'tags' => 'nullable|string',
            'url' => 'nullable|string',
            'active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
