<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;
use App\Repositories\Interfaces\SettingRepositoryInterface;

class EloquentSettingRepository implements SettingRepositoryInterface
{
    /**
     * Keys exposed to the public site endpoint.
     */
    private const PUBLIC_KEYS = [
        'site_phone',
        'site_email',
        'site_address',
        'social_linkedin',
        'social_twitter',
        'social_facebook',
        'social_instagram',
        'ga_tracking_id',
        'gtm_id',
        'fb_pixel_id',
        'tiktok_pixel_id',
        'custom_head_scripts',
        'custom_footer_scripts',
        'maintenance_mode',
        'banner_active',
        'banner_text',
        'banner_type',
        'cookie_consent_enabled',
        'cookie_banner_title',
        'cookie_policy_url',
        'cookie_banner_message',
        'cookie_banner_description',
        'cookie_accept_text',
        'cookie_decline_text',
        'cookie_necessary_label',
        'cookie_analytics_label',
        'cookie_marketing_label',
        'newsletter_popup_enabled',
        'newsletter_popup_heading',
        'newsletter_popup_subtext',
        'privacy_policy_title',
        'privacy_policy_updated',
        'privacy_policy_content',
        'logo_light',
        'logo_dark',
    ];

    public function all()
    {
        return Setting::all()->pluck('value', 'key')->toArray();
    }

    public function get($key)
    {
        $setting = Setting::find($key);

        return $setting?->value;
    }

    public function set($key, $value)
    {
        return Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    public function setMany(array $data, array $allowed)
    {
        $updated = [];

        foreach ($data as $key => $value) {
            if (!in_array($key, $allowed)) {
                continue;
            }

            // Skip masked SMTP password
            if ($key === 'smtp_pass' && $value === '••••••••') {
                continue;
            }

            $this->set($key, $value);
            $updated[$key] = $value;
        }

        return $updated;
    }

    public function getPublicSite()
    {
        return Setting::whereIn('key', self::PUBLIC_KEYS)
            ->get()
            ->pluck('value', 'key')
            ->toArray();
    }
}
