<?php

namespace App\Services;

use App\Repositories\Interfaces\InquiryRepositoryInterface;
use App\Repositories\Interfaces\SettingRepositoryInterface;
use Illuminate\Support\Facades\Mail;
use Exception;

class InquiryService
{
    protected InquiryRepositoryInterface $inquiryRepo;
    protected SettingRepositoryInterface $settingRepo;

    public function __construct(
        InquiryRepositoryInterface $inquiryRepo,
        SettingRepositoryInterface $settingRepo
    ) {
        $this->inquiryRepo = $inquiryRepo;
        $this->settingRepo = $settingRepo;
    }

    public function getAll(array $params = []): mixed
    {
        return $this->inquiryRepo->all();
    }

    public function submit(array $data): mixed
    {
        $inquiry = $this->inquiryRepo->create($data);

        try {
            $this->sendNotificationEmail($inquiry);
        } catch (Exception $e) {
            report($e);
        }

        return $inquiry;
    }

    public function update(int $id, array $data): mixed
    {
        return $this->inquiryRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->inquiryRepo->delete($id);
    }

    public function sendNotificationEmail(object $inquiry): void
    {
        $smtpHost = $this->settingRepo->get('smtp_host');
        $smtpPort = $this->settingRepo->get('smtp_port') ?? '587';
        $smtpSecure = $this->settingRepo->get('smtp_secure') === 'true';
        $smtpUser = $this->settingRepo->get('smtp_user');
        $smtpPass = $this->settingRepo->get('smtp_pass');
        $notifyEmail = $this->settingRepo->get('notify_email');
        $fromName = $this->settingRepo->get('from_name') ?? 'TSP Website';

        if (!$smtpUser || !$notifyEmail) {
            return;
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

        $category = $inquiry->category ?? 'General';
        $name = $inquiry->name;
        $email = $inquiry->email;
        $phone = $inquiry->phone ?? '—';
        $subCategory = $inquiry->sub_category ?? '—';
        $description = $inquiry->description ?? '—';

        $subject = "New Inquiry: {$category} — {$name}";

        $html = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 600px;">
    <h2 style="color: #0F4C8F;">New Website Inquiry</h2>
    <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5;">Name</td><td style="padding:8px;">{$name}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5;">Email</td><td style="padding:8px;"><a href="mailto:{$email}">{$email}</a></td></tr>
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5;">Phone</td><td style="padding:8px;">{$phone}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5;">Category</td><td style="padding:8px;">{$category}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5;">Sub-Category</td><td style="padding:8px;">{$subCategory}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; background:#f5f5f5; vertical-align:top;">Message</td><td style="padding:8px;">{$description}</td></tr>
    </table>
    <p style="color:#888; font-size:12px; margin-top:20px;">Sent from tech-solutionspro.com contact form</p>
</div>
HTML;

        Mail::html($html, function ($message) use ($notifyEmail, $subject) {
            $message->to($notifyEmail)->subject($subject);
        });
    }
}
