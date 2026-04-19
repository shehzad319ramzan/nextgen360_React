<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomEvent extends Model
{
    use HasFactory;

    protected $table = 'custom_events';

    protected $fillable = [
        'name',
        'page',
        'data',
        'ip',
        'session_id',
    ];
}
