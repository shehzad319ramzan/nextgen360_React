<?php

namespace App\Services;

use App\Repositories\Interfaces\TrackingRepositoryInterface;

class TrackingService
{
    protected TrackingRepositoryInterface $trackingRepo;

    public function __construct(TrackingRepositoryInterface $trackingRepo)
    {
        $this->trackingRepo = $trackingRepo;
    }

    public function recordPageView(array $data): mixed
    {
        return $this->trackingRepo->recordPageView($data);
    }

    public function recordEvent(array $data): mixed
    {
        if (isset($data['data']) && is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        return $this->trackingRepo->recordEvent($data);
    }

    public function getActiveEventDefinitions(): mixed
    {
        return $this->trackingRepo->getActiveEvents();
    }

    public function getStats(int $days = 30): array
    {
        return $this->trackingRepo->getStats($days);
    }

    public function getAllTrackedEvents(): mixed
    {
        return $this->trackingRepo->getTrackedEvents();
    }

    public function createTrackedEvent(array $data): mixed
    {
        $data['page_match'] = $data['page_match'] ?? '*';
        $data['event_type'] = $data['event_type'] ?? 'click';
        $data['active'] = $data['active'] ?? true;

        return $this->trackingRepo->createTrackedEvent($data);
    }

    public function updateTrackedEvent(int $id, array $data): mixed
    {
        return $this->trackingRepo->updateTrackedEvent($id, $data);
    }

    public function deleteTrackedEvent(int $id): void
    {
        $this->trackingRepo->deleteTrackedEvent($id);
    }
}
