<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id',
        'text',
        'is_multiple_choice',
        'is_required',
        'order',
    ];

    protected $casts = [
        'is_multiple_choice' => 'boolean',
        'is_required' => 'boolean',
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }

    public function options()
    {
        return $this->hasMany(PollOption::class, 'question_id')->orderBy('order');
    }
}
