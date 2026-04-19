<?php

namespace App\Repositories\Eloquent;

use App\Models\Redirect;
use App\Repositories\Interfaces\RedirectRepositoryInterface;

class EloquentRedirectRepository implements RedirectRepositoryInterface
{
    public function all()
    {
        return Redirect::orderBy('created_at', 'desc')->get();
    }

    public function create(array $data)
    {
        return Redirect::create($data);
    }

    public function update($id, array $data)
    {
        $redirect = Redirect::findOrFail($id);
        $redirect->update($data);

        return $redirect;
    }

    public function delete($id)
    {
        $redirect = Redirect::findOrFail($id);
        $redirect->delete();

        return $redirect;
    }

    public function resolve($path)
    {
        $redirect = Redirect::where('from_path', $path)
            ->where('active', true)
            ->first();

        if ($redirect) {
            $redirect->increment('hits');
        }

        return $redirect;
    }
}
