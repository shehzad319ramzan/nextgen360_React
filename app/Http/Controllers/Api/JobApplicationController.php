<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Services\JobApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function __construct(
        private JobApplicationService $jobApplicationService
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->only(['status', 'job_id', 'page', 'limit']);
            $result = $this->jobApplicationService->getAll($filters);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $application = $this->jobApplicationService->find($id);
            if (!$application) {
                return response()->json(['error' => 'Not found'], 404);
            }
            return response()->json($application);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function submit(StoreJobApplicationRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            unset($data['resume']);

            if ($request->hasFile('resume')) {
                $file = $request->file('resume');
                $filename = 'resume-' . time() . '-' . mt_rand(1, 1000000) . '.' . $file->getClientOriginalExtension();
                $file->move(storage_path('app/public/resumes'), $filename);
                $data['resume_url'] = '/uploads/resumes/' . $filename;
            }

            $result = $this->jobApplicationService->create($data);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to submit application'], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->jobApplicationService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->jobApplicationService->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
