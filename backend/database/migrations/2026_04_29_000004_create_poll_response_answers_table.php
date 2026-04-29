<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('poll_response_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('poll_responses')->cascadeOnDelete();
            $table->foreignId('question_id')->constrained('poll_questions')->cascadeOnDelete();
            $table->foreignId('option_id')->constrained('poll_options')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poll_response_answers');
    }
};
