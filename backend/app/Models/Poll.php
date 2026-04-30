<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'is_anonymous',
        'show_stats',
        'allow_multiple_votes',
        'is_public',
        'requires_auth',
        'expires_at',
        'categories',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'show_stats' => 'boolean',
        'allow_multiple_votes' => 'boolean',
        'is_public' => 'boolean',
        'requires_auth' => 'boolean',
        'expires_at' => 'datetime',
        'categories' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(PollQuestion::class)->orderBy('order');
    }

    public function responses()
    {
        return $this->hasMany(PollResponse::class);
    }
}
