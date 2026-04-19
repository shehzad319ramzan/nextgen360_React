<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();

            // Logos shown in the header dropdown
            $table->text('logo')->nullable();
            $table->text('active_logo')->nullable();

            // Section 1 — Hero
            $table->string('hero_title')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_image')->nullable();

            // Section 2 — Why choose / Features overview
            $table->string('features_title')->nullable();
            $table->text('features_description')->nullable();
            $table->json('features_points')->nullable();
            $table->text('features_image')->nullable();

            // Section 3 — Key Features grid
            $table->string('key_features_title')->nullable();
            $table->text('key_features_image')->nullable();
            $table->json('key_features')->nullable();

            $table->string('website_link')->nullable();
            $table->boolean('active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
