<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Seed default application settings.
     */
    public function run(): void
    {
        $settings = [
            // SMTP Settings
            ['key' => 'smtp_host', 'value' => 'smtp.gmail.com'],
            ['key' => 'smtp_port', 'value' => '587'],
            ['key' => 'smtp_secure', 'value' => 'false'],
            ['key' => 'smtp_user', 'value' => ''],
            ['key' => 'smtp_pass', 'value' => ''],
            ['key' => 'notify_email', 'value' => ''],
            ['key' => 'from_name', 'value' => 'TSP Website'],

            // Site Settings
            ['key' => 'site_phone', 'value' => '0115 990 3394'],
            ['key' => 'site_email', 'value' => 'admin@tech-solutionspro.com'],
            ['key' => 'site_address', 'value' => 'Nottingham UK'],

            // Social Media
            ['key' => 'social_linkedin', 'value' => ''],
            ['key' => 'social_twitter', 'value' => ''],
            ['key' => 'social_facebook', 'value' => ''],
            ['key' => 'social_instagram', 'value' => ''],

            // Analytics
            ['key' => 'ga_tracking_id', 'value' => ''],
            ['key' => 'gtm_id', 'value' => ''],
            ['key' => 'fb_pixel_id', 'value' => ''],
            ['key' => 'tiktok_pixel_id', 'value' => ''],
            ['key' => 'custom_head_scripts', 'value' => ''],
            ['key' => 'custom_footer_scripts', 'value' => ''],

            // Maintenance
            ['key' => 'maintenance_mode', 'value' => 'false'],
            ['key' => 'banner_active', 'value' => 'false'],
            ['key' => 'banner_text', 'value' => ''],
            ['key' => 'banner_type', 'value' => 'info'],

            // Cookie Consent
            ['key' => 'cookie_consent_enabled', 'value' => 'true'],
            ['key' => 'cookie_banner_title', 'value' => 'We value your privacy'],
            ['key' => 'cookie_policy_url', 'value' => '/privacy-policy'],
            ['key' => 'cookie_banner_message', 'value' => 'We use cookies to enhance your browsing experience, serve personalised content and analyse our traffic.'],
            ['key' => 'cookie_banner_description', 'value' => 'Cookies are small text files used to make websites work more efficiently. We use strictly necessary cookies to keep the site running, analytics cookies to understand how visitors use our site, and marketing cookies to show relevant ads. You can choose which categories you want to allow.'],
            ['key' => 'cookie_accept_text', 'value' => 'Accept All'],
            ['key' => 'cookie_decline_text', 'value' => 'Reject All'],
            ['key' => 'cookie_necessary_label', 'value' => 'Strictly Necessary'],
            ['key' => 'cookie_analytics_label', 'value' => 'Analytics & Performance'],
            ['key' => 'cookie_marketing_label', 'value' => 'Marketing & Advertising'],

            // Newsletter Popup
            ['key' => 'newsletter_popup_enabled', 'value' => 'true'],
            ['key' => 'newsletter_popup_heading', 'value' => 'Stay in the loop'],
            ['key' => 'newsletter_popup_subtext', 'value' => 'Get notified about events, offers and the latest from Tech Solutions Pro.'],

            // Privacy Policy
            ['key' => 'privacy_policy_title', 'value' => 'Privacy Policy'],
            ['key' => 'privacy_policy_updated', 'value' => 'April 2026'],
            ['key' => 'logo_light', 'value' => ''],
            ['key' => 'logo_dark', 'value' => ''],
            ['key' => 'privacy_policy_content', 'value' => '<h2>Introduction</h2><p>Tech Solutions Pro ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what data we collect, how we use it, and the rights you have over your information.</p><h2>Information We Collect</h2><p>We collect information you provide directly (name, email, phone, message content) as well as information collected automatically (IP address, browser type, pages visited) via cookies and analytics tools.</p><h2>How We Use Your Information</h2><ul><li>Respond to enquiries and support requests.</li><li>Deliver the services you request.</li><li>Send newsletters and marketing communications (with consent).</li><li>Improve the performance and security of our website.</li></ul><h2>Cookies & Tracking</h2><p>Our site uses cookies to remember preferences and understand how visitors use the site. You can choose which categories to allow when you first visit.</p><h2>Sharing & Disclosure</h2><p>We do not sell your personal information. We may share data with trusted service providers who help us operate the site, and only to the extent necessary.</p><h2>Data Security</h2><p>We use industry-standard safeguards to protect your information from unauthorised access, alteration or disclosure.</p><h2>Your Rights</h2><ul><li>Access the personal information we hold about you.</li><li>Request correction or deletion of your information.</li><li>Withdraw consent for marketing communications.</li><li>Object to or restrict certain processing activities.</li></ul><h2>Changes to this Policy</h2><p>We may update this Privacy Policy from time to time. The "Last updated" date above will reflect the most recent changes.</p><h2>Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us using the details on our contact page.</p>'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
