<?php

namespace App\Repositories\Eloquent;

use App\Models\NewsletterSubscriber;
use App\Repositories\Interfaces\NewsletterRepositoryInterface;

class EloquentNewsletterRepository implements NewsletterRepositoryInterface
{
    public function all()
    {
        return NewsletterSubscriber::orderBy('created_at', 'desc')->get();
    }

    public function subscribe(array $data)
    {
        return NewsletterSubscriber::firstOrCreate(
            ['email' => $data['email']],
            $data
        );
    }

    public function update($id, array $data)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->update($data);

        return $subscriber;
    }

    public function delete($id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->delete();

        return $subscriber;
    }

    public function export()
    {
        return NewsletterSubscriber::all(['id', 'email', 'name', 'source', 'active', 'created_at'])->toArray();
    }

    public function activeSubscribers()
    {
        return NewsletterSubscriber::where('active', true)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
