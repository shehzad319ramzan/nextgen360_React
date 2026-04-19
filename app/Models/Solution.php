<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    protected $table = 'solutions';

    protected $fillable = [
        'title',
        'slug',
        'tagline',
        'logo',
        'active_logo',
        'hero_title',
        'hero_description',
        'hero_image',
        'features_title',
        'features_description',
        'features_points',
        'features_image',
        'key_features_title',
        'key_features_image',
        'key_features',
        'website_link',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'features_points' => 'array',
        'key_features' => 'array',
    ];
}
