<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OAuthClient;
use Illuminate\Support\Facades\DB;

class PassportClientSeeder extends Seeder
{
    public function run(): void
    {
        // Check if oauth_clients table exists and has data
        $existingClient = DB::table('oauth_clients')->where('personal_access_client', 1)->first();
        
        if (!$existingClient) {
            DB::table('oauth_clients')->insert([
                'id' => 1,
                'user_id' => null,
                'name' => 'TSP Personal Access Client',
                'secret' => '',
                'personal_access_client' => 1,
                'password_client' => 0,
                'revoked' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Check if oauth_personal_access_clients has the entry
        $existingPersonalClient = DB::table('oauth_personal_access_clients')->where('client_id', 1)->first();
        
        if (!$existingPersonalClient) {
            DB::table('oauth_personal_access_clients')->insert([
                'client_id' => 1,
                'provider' => 'users',
            ]);
        }
    }
}