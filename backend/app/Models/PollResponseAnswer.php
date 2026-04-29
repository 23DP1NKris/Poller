<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollResponseAnswer extends Model
{
    protected $fillable = ['response_id', 'question_id', 'option_id'];

    public function response()
    {
        return $this->belongsTo(PollResponse::class);
    }

    public function question()
    {
        return $this->belongsTo(PollQuestion::class);
    }

    public function option()
    {
        return $this->belongsTo(PollOption::class);
    }
}
