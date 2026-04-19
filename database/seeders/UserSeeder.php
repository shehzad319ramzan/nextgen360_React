<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@tech-solutionspro.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('Admin@1234'),
            ]
        );
        $admin->syncRoles('admin');
        // Give all permissions directly so RBAC works independently of role
        $allPerms = Permission::where('guard_name', 'api')->pluck('name')->toArray();
        $admin->syncPermissions($allPerms);

        $seo = User::firstOrCreate(
            ['email' => 'seo@tech-solutionspro.com'],
            [
                'name' => 'SEO Manager',
                'password' => Hash::make('Seo@1234'),
            ]
        );
        $seo->syncRoles('seo');
        // Copy role permissions as direct permissions
        $rolePerms = $seo->getPermissionsViaRoles()->pluck('name')->toArray();
        $seo->syncPermissions($rolePerms);
    }
}
