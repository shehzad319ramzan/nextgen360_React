<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PassportClientSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            SeoSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
