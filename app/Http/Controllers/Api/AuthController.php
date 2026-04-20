<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {}

    public function login(LoginRequest $request): JsonResponse
    {
        Log::channel('daily')->info('Login attempt', [
            'email' => $request->input('email'),
            'ip' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ]);

        try {
            $result = $this->authService->login(
                $request->input('email'),
                $request->input('password')
            );

            Log::channel('daily')->info('Login successful', [
                'email' => $request->input('email'),
                'user_id' => $result['user']->id ?? null,
            ]);

            return response()->json([
                'token' => $result['token'],
                'user' => $result['user'],
            ]);
        } catch (\Exception $e) {
            Log::channel('daily')->warning('Login failed', [
                'email' => $request->input('email'),
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function me(Request $request): JsonResponse
    {
        try {
            $user = $this->authService->me($request->user()->id);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modules(): JsonResponse
    {
        return response()->json($this->authService->getModules());
    }

    public function listUsers(): JsonResponse
    {
        try {
            $users = $this->authService->listUsers();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createUser(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->createUser($request->validated());
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 409);
        }
    }

    public function updateUser(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->authService->updateUser($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function deleteUser($id, Request $request): JsonResponse
    {
        try {
            $this->authService->deleteUser($id, $request->user()->id);
            return response()->json(['message' => 'User deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        try {
            $this->authService->changePassword(
                $request->user()->id,
                $request->input('current'),
                $request->input('newPassword')
            );

            return response()->json(['message' => 'Password changed']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}
