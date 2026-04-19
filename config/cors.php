<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for cross-origin resource sharing. The `allowed_origins` value
    | is read from the FRONTEND_URL environment variable to match the Node.js
    | backend behaviour.
    |
    */

    'paths' => ['api/*', 'oauth/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://frontend.nextgen360.net',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
