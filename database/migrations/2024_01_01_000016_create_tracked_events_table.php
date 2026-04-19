<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracked_events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('selector')->nullable();
            $table->string('page_match')->nullable();
            $table->string('event_type')->default('click');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracked_events');
    }
};
