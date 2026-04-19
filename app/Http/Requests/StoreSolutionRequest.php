<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolutionRequest extends FormRequest
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
            'tagline' => 'nullable|string|max:255',
            'logo' => 'nullable|string',
            'active_logo' => 'nullable|string',
            'hero_title' => 'nullable|string',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'features_title' => 'nullable|string',
            'features_description' => 'nullable|string',
            'features_points' => 'nullable|array',
            'features_image' => 'nullable|string',
            'key_features_title' => 'nullable|string',
            'key_features_image' => 'nullable|string',
            'key_features' => 'nullable|array',
            'website_link' => 'nullable|string',
            'active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
