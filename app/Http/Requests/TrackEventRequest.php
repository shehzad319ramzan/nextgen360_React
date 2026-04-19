<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrackEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'page' => 'nullable|string',
            'data' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Event name is required',
        ];
    }
}
