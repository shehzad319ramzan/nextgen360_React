<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $table = 'inquiries';

    protected $fillable = [
        'category',
        'sub_category',
        'name',
        'email',
        'phone',
        'description',
        'status',
        'notes',
    ];
}
