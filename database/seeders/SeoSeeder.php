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
                'title' => 'TSP - Tech Solutions Pro | Digital Solutions & Software Development',
                'description' => 'Tech Solutions Pro delivers cutting-edge software development, web applications, mobile apps, and digital transformation services for businesses worldwide.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'about',
                'title' => 'About Us | Tech Solutions Pro',
                'description' => 'Learn about Tech Solutions Pro, our mission, values, and the expert team behind our innovative digital solutions.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'services',
                'title' => 'Our Services | Tech Solutions Pro',
                'description' => 'Explore our comprehensive range of digital services including web development, mobile apps, SaaS, UI/UX design, cloud DevOps, and AI solutions.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'solutions',
                'title' => 'Solutions | Tech Solutions Pro',
                'description' => 'Discover tailored technology solutions designed to solve your business challenges and drive growth.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'careers',
                'title' => 'Careers | Tech Solutions Pro',
                'description' => 'Join our team at Tech Solutions Pro. Explore exciting career opportunities in software development, design, and technology.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'contact',
                'title' => 'Contact Us | Tech Solutions Pro',
                'description' => 'Get in touch with Tech Solutions Pro for inquiries, project discussions, and partnership opportunities.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'blog',
                'title' => 'Blog | Tech Solutions Pro',
                'description' => 'Stay updated with the latest insights, trends, and news in technology, software development, and digital innovation.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'portfolio',
                'title' => 'Portfolio | Tech Solutions Pro',
                'description' => 'Browse our portfolio of successful projects showcasing our expertise in web, mobile, and software development.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-web-development',
                'title' => 'Web Development Services | Tech Solutions Pro',
                'description' => 'Professional web development services including custom websites, web applications, e-commerce platforms, and progressive web apps.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-mobile-app-development',
                'title' => 'Mobile App Development | Tech Solutions Pro',
                'description' => 'Expert mobile app development for iOS and Android platforms, delivering high-performance native and cross-platform applications.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-saas-development',
                'title' => 'SaaS Development | Tech Solutions Pro',
                'description' => 'End-to-end SaaS application development services, from architecture design to deployment and scaling.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-mvp-development',
                'title' => 'MVP Development | Tech Solutions Pro',
                'description' => 'Rapid MVP development services to validate your business idea quickly and efficiently with minimal investment.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-ui-ux-design',
                'title' => 'UI/UX Design Services | Tech Solutions Pro',
                'description' => 'Creative UI/UX design services that deliver intuitive, engaging, and user-centered digital experiences.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-product-design',
                'title' => 'Product Design | Tech Solutions Pro',
                'description' => 'Comprehensive product design services from concept to prototype, creating digital products users love.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-saas-application-design',
                'title' => 'SaaS Application Design | Tech Solutions Pro',
                'description' => 'Specialized SaaS application design services focused on usability, scalability, and conversion optimization.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-cloud-devops',
                'title' => 'Cloud & DevOps Services | Tech Solutions Pro',
                'description' => 'Cloud infrastructure and DevOps services including CI/CD pipelines, containerization, and cloud migration.',
                'robots' => 'index, follow',
            ],
            [
                'page' => 'service-ai-machine-learning',
                'title' => 'AI & Machine Learning | Tech Solutions Pro',
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
