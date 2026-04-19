<?php

namespace App\Repositories\Eloquent;

use App\Models\Blog;
use App\Repositories\Interfaces\BlogRepositoryInterface;

class EloquentBlogRepository implements BlogRepositoryInterface
{
    public function all($authUserId = null)
    {
        $query = Blog::with('author:id,name');

        if (!$authUserId) {
            $query->where('status', 'published');
        }

        return $query->orderBy('created_at', 'desc')->get()->map(function ($blog) {
            $blog->author_name = $blog->author?->name;
            return $blog;
        });
    }

    public function findBySlug($slug)
    {
        $blog = Blog::with('author:id,name')->where('slug', $slug)->firstOrFail();
        $blog->author_name = $blog->author?->name;

        return $blog;
    }

    public function slugExists(string $slug): bool
    {
        return Blog::where('slug', $slug)->exists();
    }

    public function create(array $data)
    {
        return Blog::create($data);
    }

    public function update($id, array $data)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($data);

        return $blog;
    }

    public function delete($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return $blog;
    }
}
