<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'text',
        'order',
    ];

    public function question()
    {
        return $this->belongsTo(PollQuestion::class);
    }

    public function responses()
    {
        return $this->hasMany(PollResponseAnswer::class, 'option_id');
    }
}
