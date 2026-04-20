<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Laravel\Passport\PersonalAccessClient;

class PassportClientSeeder extends Seeder
{
    public function run(): void
    {
        // Create personal access client if it doesn't exist
        PersonalAccessClient::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'TSP Personal Access Client',
                'secret' => '', // No secret needed for personal access tokens
                'personal_access_client' => 1,
                'revoked' => 0,
            ]
        );
    }
}