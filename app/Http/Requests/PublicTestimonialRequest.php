<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublicTestimonialRequest extends FormRequest
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
            'rating' => 'nullable|integer|min:1|max:5',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'content.required' => 'Review content is required',
        ];
    }
}
