<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * All repository interface-to-implementation bindings.
     *
     * @var array<class-string, class-string>
     */
    public array $bindings = [
        \App\Repositories\Interfaces\UserRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentUserRepository::class,

        \App\Repositories\Interfaces\SeoRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentSeoRepository::class,

        \App\Repositories\Interfaces\BlogRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentBlogRepository::class,

        \App\Repositories\Interfaces\InquiryRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentInquiryRepository::class,

        \App\Repositories\Interfaces\RedirectRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentRedirectRepository::class,

        \App\Repositories\Interfaces\SettingRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentSettingRepository::class,

        \App\Repositories\Interfaces\JobRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentJobRepository::class,

        \App\Repositories\Interfaces\JobApplicationRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentJobApplicationRepository::class,

        \App\Repositories\Interfaces\TestimonialRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentTestimonialRepository::class,

        \App\Repositories\Interfaces\MediaRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentMediaRepository::class,

        \App\Repositories\Interfaces\TeamRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentTeamRepository::class,

        \App\Repositories\Interfaces\PortfolioRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentPortfolioRepository::class,

        \App\Repositories\Interfaces\SolutionRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentSolutionRepository::class,

        \App\Repositories\Interfaces\NewsletterRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentNewsletterRepository::class,

        \App\Repositories\Interfaces\ActivityLogRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentActivityLogRepository::class,

        \App\Repositories\Interfaces\AnalyticsRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentAnalyticsRepository::class,

        \App\Repositories\Interfaces\TrackingRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentTrackingRepository::class,

        \App\Repositories\Interfaces\CaseStudyRepositoryInterface::class
            => \App\Repositories\Eloquent\EloquentCaseStudyRepository::class,
    ];

    /**
     * Register repository bindings.
     */
    public function register(): void
    {
        foreach ($this->bindings as $interface => $implementation) {
            $this->app->bind($interface, $implementation);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
