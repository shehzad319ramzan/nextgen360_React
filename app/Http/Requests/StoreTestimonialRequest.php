<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'role' => 'nullable|string',
            'company' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'avatar' => 'nullable|string',
            'active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
