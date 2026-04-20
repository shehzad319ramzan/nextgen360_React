<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PassportClientSeeder extends Seeder
{
    public function run(): void
    {
        // Create personal access client if it doesn't exist
        // This uses the oauth_personal_access_clients table
        DB::table('oauth_personal_access_clients')->firstOrCreate(
            ['client_id' => 1],
            [
                'client_id' => 1,
                'provider' => 'users',
            ]
        );

        // Also ensure oauth_clients has the personal access client
        DB::table('oauth_clients')->firstOrCreate(
            ['id' => 1],
            [
                'user_id' => null,
                'name' => 'TSP Personal Access Client',
                'secret' => '',
                'personal_access_client' => 1,
                'password_client' => 0,
                'revoked' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}