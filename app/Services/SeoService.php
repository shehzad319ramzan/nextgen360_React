<?php

namespace App\Services;

use App\Repositories\Interfaces\SeoRepositoryInterface;
use App\Repositories\Interfaces\SettingRepositoryInterface;

class SeoService
{
    protected SeoRepositoryInterface $seoRepo;
    protected SettingRepositoryInterface $settingRepo;

    public function __construct(
        SeoRepositoryInterface $seoRepo,
        SettingRepositoryInterface $settingRepo
    ) {
        $this->seoRepo = $seoRepo;
        $this->settingRepo = $settingRepo;
    }

    public function all(): mixed
    {
        return $this->seoRepo->all();
    }

    public function findByPage(string $page): mixed
    {
        return $this->seoRepo->findByPage($page);
    }

    public function updatePage(string $page, array $data): mixed
    {
        return $this->seoRepo->createOrUpdate($page, $data);
    }

    public function healthCheck(): array
    {
        $pages = $this->seoRepo->all();
        $report = [];

        foreach ($pages as $page) {
            $report[] = [
                'page' => $page->page,
                'score' => $this->calcScore($page),
                'missing' => $this->getMissing($page),
                'title_length' => strlen($page->title ?? ''),
                'description_length' => strlen($page->description ?? ''),
            ];
        }

        return $report;
    }

    public function getRobotsContent(): string
    {
        $path = public_path('robots.txt');
        if (file_exists($path)) {
            return file_get_contents($path);
        }

        $row = $this->settingRepo->get('robots_txt');
        $default = "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: "
            . config('app.url', 'https://https://nextgen360.info') . '/sitemap.xml';

        return $row ?? $default;
    }

    public function saveRobotsContent(string $content): void
    {
        $this->settingRepo->set('robots_txt', $content);
        file_put_contents(public_path('robots.txt'), $content);
    }

    public function getHtaccessContent(): string
    {
        $path = public_path('.htaccess');
        if (file_exists($path)) {
            return file_get_contents($path);
        }

        $row = $this->settingRepo->get('htaccess');
        $default = "# Default .htaccess rules\nRewriteEngine On\nRewriteCond %{HTTPS} off\n"
            . "RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n"
            . "# Redirect www to non-www\nRewriteCond %{HTTP_HOST} ^www\\.(.*) [NC]\n"
            . "RewriteRule ^(.*)$ https://%1/\$1 [R=301,L]";

        return $row ?? $default;
    }

    public function saveHtaccessContent(string $content): void
    {
        $this->settingRepo->set('htaccess', $content);
        file_put_contents(public_path('.htaccess'), $content);
    }

    public function getCustomCode(): array
    {
        return [
            'custom_head_scripts' => $this->settingRepo->get('custom_head_scripts') ?? '',
            'custom_footer_scripts' => $this->settingRepo->get('custom_footer_scripts') ?? '',
        ];
    }

    public function saveCustomCode(array $data): void
    {
        if (array_key_exists('custom_head_scripts', $data)) {
            $this->settingRepo->set('custom_head_scripts', $data['custom_head_scripts'] ?? '');
        }

        if (array_key_exists('custom_footer_scripts', $data)) {
            $this->settingRepo->set('custom_footer_scripts', $data['custom_footer_scripts'] ?? '');
        }
    }

    private function calcScore(object $page): int
    {
        $fields = [
            'title', 'description', 'keywords', 'og_title', 'og_description',
            'og_image', 'twitter_title', 'twitter_description', 'canonical',
            'robots', 'schema_json',
        ];

        $filled = 0;
        foreach ($fields as $field) {
            if (!empty($page->{$field}) && trim($page->{$field}) !== '') {
                $filled++;
            }
        }

        return (int) round(($filled / count($fields)) * 100);
    }

    private function getMissing(object $page): array
    {
        $required = [
            'title' => 'Meta Title',
            'description' => 'Meta Description',
            'keywords' => 'Keywords',
            'og_title' => 'OG Title',
            'og_description' => 'OG Description',
            'og_image' => 'OG Image',
            'canonical' => 'Canonical URL',
        ];

        $missing = [];
        foreach ($required as $key => $label) {
            if (empty($page->{$key})) {
                $missing[] = $label;
            }
        }

        return $missing;
    }
}
