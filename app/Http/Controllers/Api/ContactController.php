<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\InquiryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(
        private InquiryService $inquiryService
    ) {}

    public function submit(Request $request): JsonResponse
    {
        try {
            $raw = $request->input('data', $request->all());

            // Normalize field names (frontend sends PascalCase)
            $name = $raw['name'] ?? $raw['Name'] ?? null;
            $email = $raw['email'] ?? $raw['Email'] ?? null;

            if (!$name || !$email) {
                return response()->json(['error' => 'Name and email required'], 400);
            }

            $data = [
                'name' => $name,
                'email' => $email,
                'phone' => $raw['phone'] ?? $raw['PhoneNo'] ?? $raw['Phone'] ?? null,
                'category' => $raw['category'] ?? $raw['Category'] ?? null,
                'sub_category' => $raw['sub_category'] ?? $raw['SubCategory'] ?? null,
                'description' => $raw['description'] ?? $raw['Description'] ?? null,
                'status' => 'new',
            ];

            $result = $this->inquiryService->submit($data);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->inquiryService->getAll($request->query());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->inquiryService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->inquiryService->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
