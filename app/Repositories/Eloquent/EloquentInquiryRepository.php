<?php

namespace App\Repositories\Eloquent;

use App\Models\Inquiry;
use App\Repositories\Interfaces\InquiryRepositoryInterface;

class EloquentInquiryRepository implements InquiryRepositoryInterface
{
    public function all()
    {
        return Inquiry::orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return Inquiry::findOrFail($id);
    }

    public function create(array $data)
    {
        return Inquiry::create($data);
    }

    public function update($id, array $data)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->update($data);

        return $inquiry;
    }

    public function delete($id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->delete();

        return $inquiry;
    }
}
