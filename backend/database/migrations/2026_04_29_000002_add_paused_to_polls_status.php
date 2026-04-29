<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE polls MODIFY COLUMN status ENUM('draft', 'active', 'closed', 'paused') NOT NULL DEFAULT 'active'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE polls MODIFY COLUMN status ENUM('draft', 'active', 'closed') NOT NULL DEFAULT 'active'");
    }
};
