<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;

    protected $table = 'case_studies';

    protected $fillable = [
        'title',
        'slug',
        'client',
        'industry',
        'duration',
        'cover_image',
        'summary',
        'challenge',
        'solution',
        'results',
        'metrics',
        'tags',
        'testimonial_quote',
        'testimonial_author',
        'featured',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'active' => 'boolean',
    ];
}
