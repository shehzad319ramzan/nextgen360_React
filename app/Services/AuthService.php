<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Exception;

class AuthService
{
    const ALL_MODULES = [
        'dashboard', 'analytics', 'inquiries', 'blogs', 'jobs',
        'job-applications', 'testimonials', 'team', 'portfolio', 'solutions',
        'case-studies',
        'seo', 'robots-txt', 'htaccess', 'newsletter',
        'media', 'users', 'settings', 'activity-log', 'tracking', 'redirects',
    ];

    protected UserRepositoryInterface $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function login(string $email, string $password): array
    {
        $user = $this->userRepo->findByEmail(strtolower($email));

        if (!$user || !Hash::check($password, $user->password)) {
            throw new Exception('Invalid credentials', 401);
        }

        $token = $user->createToken('TSP Personal Access Token')->accessToken;

        return [
            'token' => $token,
            'user' => $this->formatUser($user),
        ];
    }

    public function me(int $userId): array
    {
        $user = $this->userRepo->findById($userId);

        if (!$user) {
            throw new Exception('User not found', 404);
        }

        return $this->formatUser($user);
    }

    public function getModules(): array
    {
        return self::ALL_MODULES;
    }

    public function listUsers(): mixed
    {
        $users = $this->userRepo->all();

        return $users->map(function ($user) {
            return $this->formatUser($user);
        });
    }

    public function createUser(array $data): array
    {
        $data['email'] = strtolower($data['email']);
        $data['password'] = Hash::make($data['password']);

        $role = $data['role'] ?? 'seo';
        unset($data['role'], $data['permissions']);

        $user = $this->userRepo->create($data);
        $user->syncRoles($role);

        // Copy role permissions as direct permissions so RBAC works independently
        $rolePerms = $user->getPermissionsViaRoles()->pluck('name')->toArray();
        $user->syncPermissions($rolePerms);

        return $this->formatUser($user);
    }

    public function updateUser(int $id, array $data): array
    {
        $user = $this->userRepo->findById($id);

        if (!$user) {
            throw new Exception('User not found', 404);
        }

        if (isset($data['email'])) {
            $data['email'] = strtolower($data['email']);
        }

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $role = $data['role'] ?? null;
        $hasPermissions = array_key_exists('permissions', $data);
        $permissions = $data['permissions'] ?? null;
        unset($data['role'], $data['permissions']);

        if (!empty($data)) {
            $user = $this->userRepo->update($id, $data);
        }

        if ($role) {
            $user->syncRoles($role);

            // If role changed but no custom permissions sent, reset to role defaults
            if (!$hasPermissions) {
                $rolePerms = $user->getPermissionsViaRoles()->pluck('name')->toArray();
                $user->syncPermissions($rolePerms);
            }
        }

        if ($hasPermissions) {
            if ($permissions === null) {
                // null = full access — give ALL permissions
                $allPerms = Permission::where('guard_name', 'api')->pluck('name')->toArray();
                $user->syncPermissions($allPerms);
            } else {
                // Specific modules — sync only those module permissions
                $this->syncModulePermissions($user, $permissions);
            }
        }

        return $this->formatUser($user->fresh());
    }

    public function deleteUser(int $id, int $currentUserId): void
    {
        if ($id === $currentUserId) {
            throw new Exception('Cannot delete yourself', 400);
        }

        $this->userRepo->delete($id);
    }

    public function changePassword(int $userId, string $current, string $new): void
    {
        $user = $this->userRepo->findById($userId);

        if (!$user) {
            throw new Exception('User not found', 404);
        }

        if (!Hash::check($current, $user->password)) {
            throw new Exception('Current password incorrect', 401);
        }

        $this->userRepo->update($userId, [
            'password' => Hash::make($new),
        ]);
    }

    /**
     * Sync module-level permissions from frontend format.
     * Frontend sends ["blogs", "seo", ...] → we sync all "blogs.*", "seo.*" permissions.
     */
    private function syncModulePermissions($user, array $modules): void
    {
        $permissionNames = [];

        foreach ($modules as $module) {
            $modulePerms = Permission::where('guard_name', 'api')
                ->where('name', 'like', "{$module}.%")
                ->pluck('name')
                ->toArray();

            $permissionNames = array_merge($permissionNames, $modulePerms);
        }

        $user->syncPermissions($permissionNames);
    }

    private function formatUser($user): array
    {
        // Use DIRECT permissions only — this is what RBAC actually controls
        $directPermissions = $user->getDirectPermissions()->pluck('name');

        // Extract unique module names (e.g. "blogs.view" → "blogs")
        $modules = $directPermissions->map(fn ($p) => explode('.', $p)[0])->unique()->values();

        // Check if user has ALL permissions (= full access = null for frontend)
        $totalPermissions = Permission::where('guard_name', 'api')->count();
        $isFullAccess = $directPermissions->count() >= $totalPermissions;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first() ?? 'seo',
            'roles' => $user->getRoleNames(),
            'permissions' => $isFullAccess ? null : $modules,
            'detailed_permissions' => $directPermissions,
            'created_at' => $user->created_at,
        ];
    }
}
