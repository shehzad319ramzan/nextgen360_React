<?php

namespace App\Exports;

use App\Models\NewsletterSubscriber;
use Maatwebsite\Excel\Excel;

class NewsletterSubscribersExport
{
    public function query()
    {
        return NewsletterSubscriber::where('active', true)
            ->orderBy('created_at', 'desc');
    }

    public function collection()
    {
        $subscribers = $this->query()->get();

        $data = [['Email', 'Name', 'Source', 'Subscribed At']];

        foreach ($subscribers as $sub) {
            $data[] = [
                $sub->email,
                $sub->name ?? '',
                $sub->source,
                $sub->created_at->format('Y-m-d H:i:s'),
            ];
        }

        return collect($data);
    }

    public function toCsv(): string
    {
        $lines = [];
        foreach ($this->collection() as $row) {
            $lines[] = implode(',', array_map(function ($val) {
                return '"' . str_replace('"', '""', $val) . '"';
            }, $row instanceof \Illuminate\Support\Collection ? $row->toArray() : $row));
        }

        return implode("\n", $lines);
    }
}
