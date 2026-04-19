<?php

namespace App\Repositories\Interfaces;

interface TrackingRepositoryInterface
{
    public function recordPageView(array $data);

    public function recordEvent(array $data);

    public function getActiveEvents();

    public function getStats($days);

    public function getTrackedEvents();

    public function createTrackedEvent(array $data);

    public function updateTrackedEvent($id, array $data);

    public function deleteTrackedEvent($id);
}
