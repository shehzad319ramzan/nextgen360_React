<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Setting;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    private const SITE_URL_KEY = 'site_url';
    private const DEFAULT_SITE_URL = 'https://https://nextgen360.info';

    private const STATIC_PAGES = [
        ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['path' => '/aboutus', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/digital-marketing', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['path' => '/careers', 'priority' => '0.7', 'changefreq' => 'weekly'],
        ['path' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/bello', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/workzenpro', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/echocrm', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/nowsafar', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/plannza', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/solutions/hilobby', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ];

    public function sitemap(): Response
    {
        $siteUrl = $this->getSiteUrl();
        $today = date('Y-m-d');

        $blogs = Blog::where('status', 'published')
            ->orderBy('updated_at', 'desc')
            ->get(['slug', 'updated_at']);

        $urls = [];

        // Static pages
        foreach (self::STATIC_PAGES as $page) {
            $urls[] = [
                'loc' => $siteUrl . $page['path'],
                'lastmod' => $today,
                'changefreq' => $page['changefreq'],
                'priority' => $page['priority'],
            ];
        }

        // Blog pages
        foreach ($blogs as $blog) {
            $lastmod = $blog->updated_at
                ? date('Y-m-d', strtotime($blog->updated_at))
                : $today;

            $urls[] = [
                'loc' => $siteUrl . '/blog/' . $blog->slug,
                'lastmod' => $lastmod,
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ];
        }

        $urlEntries = '';
        foreach ($urls as $url) {
            $urlEntries .= "  <url>\n";
            $urlEntries .= "    <loc>{$url['loc']}</loc>\n";
            $urlEntries .= "    <lastmod>{$url['lastmod']}</lastmod>\n";
            $urlEntries .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
            $urlEntries .= "    <priority>{$url['priority']}</priority>\n";
            $urlEntries .= "  </url>\n";
        }

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
            . "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
            . $urlEntries
            . "</urlset>";

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    public function robots(): Response
    {
        $path = public_path('robots.txt');
        if (file_exists($path)) {
            $content = file_get_contents($path);
        } else {
            $siteUrl = $this->getSiteUrl();
            $row = Setting::where('key', 'robots_txt')->first();
            $content = $row?->value
                ?? "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: {$siteUrl}/sitemap.xml";
        }

        return response($content, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }

    private function getSiteUrl(): string
    {
        return config('app.site_url', env('SITE_URL', self::DEFAULT_SITE_URL));
    }
}
