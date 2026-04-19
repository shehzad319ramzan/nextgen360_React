## TSP Backend (Laravel)

### Requirements
- PHP 8.2+
- Composer
- MySQL 8.0+

### Setup
1. cp .env.example .env
2. composer install
3. php artisan key:generate
4. Create MySQL database: tsp_db
5. php artisan migrate
6. php artisan db:seed
7. php artisan passport:install
8. php artisan storage:link
9. php artisan serve (runs on port 8000)

### Default Users
- Admin: admin@tech-solutionspro.com / Admin@1234
- SEO: seo@tech-solutionspro.com / Seo@1234
