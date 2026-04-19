<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Redirect extends Model
{
    use HasFactory;

    protected $table = 'redirects';

    protected $fillable = [
        'from_path',
        'to_path',
        'type',
        'active',
        'hits',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
