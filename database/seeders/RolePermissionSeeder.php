<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $modules = [
            'dashboard', 'analytics', 'inquiries', 'blogs', 'jobs',
            'job-applications', 'testimonials', 'team', 'portfolio', 'solutions',
            'case-studies',
            'seo', 'robots-txt', 'htaccess', 'newsletter',
            'media', 'users', 'settings', 'activity-log', 'tracking', 'redirects',
        ];

        $actions = ['view', 'create', 'update', 'delete', 'export'];

        $permissions = [];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                $permissions[] = "{$module}.{$action}";
            }
        }

        // Create all permissions for the 'api' guard
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'api']);
        }

        // Admin role gets all permissions
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $admin->syncPermissions(Permission::where('guard_name', 'api')->get());

        // SEO role gets limited permissions
        $seoPermissions = [
            'dashboard.view',
            'blogs.view', 'blogs.create', 'blogs.update', 'blogs.delete',
            'seo.view', 'seo.update',
            'robots-txt.view', 'robots-txt.update',
            'htaccess.view', 'htaccess.update',
            'analytics.view',
            'tracking.view',
            'newsletter.view', 'newsletter.export',
            'media.view', 'media.create', 'media.delete',
            'portfolio.view', 'portfolio.create', 'portfolio.update', 'portfolio.delete',
            'solutions.view', 'solutions.create', 'solutions.update', 'solutions.delete',
            'testimonials.view',
            'team.view',
        ];

        $seo = Role::firstOrCreate(['name' => 'seo', 'guard_name' => 'api']);
        $seo->syncPermissions($seoPermissions);
    }
}
