<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackedEvent extends Model
{
    use HasFactory;

    protected $table = 'tracked_events';

    protected $fillable = [
        'name',
        'selector',
        'page_match',
        'event_type',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
