<?php

namespace Database\Seeders;

use App\Models\Seo;
use Illuminate\Database\Seeder;

class SeoSeeder extends Seeder
{
    /**
     * Seed SEO metadata for all pages.
     */
    public function run(): void
    {
        $pages = [
            [
                'page' => 'home',
                'title' => 'NextGen360 | Digital Solutions & Software Development',
                'description' => 'NextGen360 delivers cutting-edge software development, web applications, mobile apps, and digital transformation services for businesses worldwide.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'about',
                'title' => 'About Us | NextGen360',
                'description' => 'Learn about NextGen360, our mission, values, and the expert team behind our innovative digital solutions.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'services',
                'title' => 'Our Services | NextGen360',
                'description' => 'Explore our comprehensive range of digital services including web development, mobile apps, SaaS, UI/UX design, cloud DevOps, and AI solutions.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'solutions',
                'title' => 'Solutions | NextGen360',
                'description' => 'Discover tailored technology solutions designed to solve your business challenges and drive growth.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'careers',
                'title' => 'Careers | NextGen360',
                'description' => 'Join our team at NextGen360. Explore exciting career opportunities in software development, design, and technology.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'contact',
                'title' => 'Contact Us | NextGen360',
                'description' => 'Get in touch with NextGen360 for inquiries, project discussions, and partnership opportunities.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'blog',
                'title' => 'Blog | NextGen360',
                'description' => 'Stay updated with the latest insights, trends, and news in technology, software development, and digital innovation.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'portfolio',
                'title' => 'Portfolio | NextGen360',
                'description' => 'Browse our portfolio of successful projects showcasing our expertise in web, mobile, and software development.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-web-development',
                'title' => 'Web Development Services | NextGen360',
                'description' => 'Professional web development services including custom websites, web applications, e-commerce platforms, and progressive web apps.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-mobile-app-development',
                'title' => 'Mobile App Development | NextGen360',
                'description' => 'Expert mobile app development for iOS and Android platforms, delivering high-performance native and cross-platform applications.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-saas-development',
                'title' => 'SaaS Development | NextGen360',
                'description' => 'End-to-end SaaS application development services, from architecture design to deployment and scaling.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-mvp-development',
                'title' => 'MVP Development | NextGen360',
                'description' => 'Rapid MVP development services to validate your business idea quickly and efficiently with minimal investment.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-ui-ux-design',
                'title' => 'UI/UX Design Services | NextGen360',
                'description' => 'Creative UI/UX design services that deliver intuitive, engaging, and user-centered digital experiences.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-product-design',
                'title' => 'Product Design | NextGen360',
                'description' => 'Comprehensive product design services from concept to prototype, creating digital products users love.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-saas-application-design',
                'title' => 'SaaS Application Design | NextGen360',
                'description' => 'Specialized SaaS application design services focused on usability, scalability, and conversion optimization.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-cloud-devops',
                'title' => 'Cloud & DevOps Services | NextGen360',
                'description' => 'Cloud infrastructure and DevOps services including CI/CD pipelines, containerization, and cloud migration.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-ai-machine-learning',
                'title' => 'AI & Machine Learning | NextGen360',
                'description' => 'AI and machine learning solutions to automate processes, gain insights, and build intelligent applications.',
                'robots' => 'index, follow',
            ],
        ];

        foreach ($pages as $page) {
            Seo::firstOrCreate(
                ['page' => $page['page']],
                [
                    'title' => $page['title'],
                    'description' => $page['description'],
                    'robots' => $page['robots'],
                ]
            );
        }
    }
}
