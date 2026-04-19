<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTrackedEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'selector' => 'required|string',
            'page_match' => 'nullable|string',
            'event_type' => 'nullable|string|in:click,submit,scroll,view',
            'active' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Event name is required',
            'selector.required' => 'CSS selector is required',
        ];
    }
}
