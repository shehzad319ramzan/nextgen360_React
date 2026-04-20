<?php

namespace App\Services;

use App\Repositories\Interfaces\SettingRepositoryInterface;
use Illuminate\Support\Facades\Mail;
use Exception;

class SettingService
{
    const COOKIE_NEWSLETTER_KEYS = [
        'cookie_consent_enabled', 'cookie_banner_title', 'cookie_policy_url',
        'cookie_banner_message', 'cookie_banner_description',
        'cookie_accept_text', 'cookie_decline_text',
        'cookie_necessary_label', 'cookie_analytics_label', 'cookie_marketing_label',
        'newsletter_popup_enabled', 'newsletter_popup_heading', 'newsletter_popup_subtext',
    ];

    const ALLOWED_KEYS = [
        'smtp_host', 'smtp_port', 'smtp_secure', 'smtp_user', 'smtp_pass', 'notify_email', 'from_name',
        'site_phone', 'site_email', 'site_address',
        'social_linkedin', 'social_twitter', 'social_facebook', 'social_instagram',
        'ga_tracking_id', 'gtm_id', 'fb_pixel_id', 'tiktok_pixel_id', 'custom_head_scripts', 'custom_footer_scripts',
        'maintenance_mode', 'banner_active', 'banner_text', 'banner_type',
        'cookie_consent_enabled', 'cookie_banner_title', 'cookie_policy_url',
        'cookie_banner_message', 'cookie_banner_description',
        'cookie_accept_text', 'cookie_decline_text',
        'cookie_necessary_label', 'cookie_analytics_label', 'cookie_marketing_label',
        'newsletter_popup_enabled', 'newsletter_popup_heading', 'newsletter_popup_subtext',
        'privacy_policy_title', 'privacy_policy_updated', 'privacy_policy_content',
        'logo_light', 'logo_dark',
    ];

    const PUBLIC_KEYS = [
        'site_phone', 'site_email', 'site_address',
        'social_linkedin', 'social_twitter', 'social_facebook', 'social_instagram',
        'ga_tracking_id', 'gtm_id', 'fb_pixel_id', 'tiktok_pixel_id', 'custom_head_scripts', 'custom_footer_scripts',
        'maintenance_mode', 'banner_active', 'banner_text', 'banner_type',
        'cookie_consent_enabled', 'cookie_banner_title', 'cookie_policy_url',
        'cookie_banner_message', 'cookie_banner_description',
        'cookie_accept_text', 'cookie_decline_text',
        'cookie_necessary_label', 'cookie_analytics_label', 'cookie_marketing_label',
        'newsletter_popup_enabled', 'newsletter_popup_heading', 'newsletter_popup_subtext',
        'privacy_policy_title', 'privacy_policy_updated', 'privacy_policy_content',
        'logo_light', 'logo_dark',
    ];

    protected SettingRepositoryInterface $settingRepo;

    public function __construct(SettingRepositoryInterface $settingRepo)
    {
        $this->settingRepo = $settingRepo;
    }

    public function all(): array
    {
        return $this->settingRepo->all();
    }

    public function save(array $data): void
    {
        foreach (self::ALLOWED_KEYS as $key) {
            if (array_key_exists($key, $data)) {
                if ($key === 'smtp_pass' && $data[$key] === '••••••••') {
                    continue;
                }

                $this->settingRepo->set($key, $data[$key]);
            }
        }
    }

    public function getPublicSite(): array
    {
        return $this->settingRepo->getPublicSite();
    }

    public function sendTestEmail(): array
    {
        $smtpHost = $this->settingRepo->get('smtp_host');
        $smtpPort = $this->settingRepo->get('smtp_port') ?? '587';
        $smtpSecure = $this->settingRepo->get('smtp_secure') === 'true';
        $smtpUser = $this->settingRepo->get('smtp_user');
        $smtpPass = $this->settingRepo->get('smtp_pass');
        $notifyEmail = $this->settingRepo->get('notify_email');
        $fromName = $this->settingRepo->get('from_name') ?? 'NextGen360 Website';

        if (!$smtpHost || !$smtpUser || !$notifyEmail) {
            throw new Exception('SMTP is not fully configured yet.', 400);
        }

        config([
            'mail.mailers.smtp.host' => $smtpHost,
            'mail.mailers.smtp.port' => (int) $smtpPort,
            'mail.mailers.smtp.encryption' => $smtpSecure ? 'tls' : null,
            'mail.mailers.smtp.username' => $smtpUser,
            'mail.mailers.smtp.password' => $smtpPass,
            'mail.from.address' => $smtpUser,
            'mail.from.name' => $fromName,
        ]);

        $html = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 500px;">
    <h2 style="color: #0F4C8F;">Test Email</h2>
    <p>Your email settings are working correctly.</p>
    <p style="color:#888; font-size:12px;">Sent from NextGen360 Admin Panel</p>
</div>
HTML;

        Mail::html($html, function ($message) use ($notifyEmail) {
            $message->to($notifyEmail)->subject('NextGen360 Admin — Test Email');
        });

        return ['message' => 'Test email sent successfully'];
    }

    public function getDatabasePath(): string
    {
        return database_path('database.sqlite');
    }
}
