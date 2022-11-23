<?php

require_once 'src/app/index.php';
require __DIR__ . '/vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();

$app->addErrorMiddleware(true, true, true);

include 'src/app/api/index.php';


$app->get('/[{params:.*}]', function (Request $request, Response $response, $args) {
    $response->withHeader('Content-type', 'text/html');
    $response->getBody()->write(file_get_contents(__DIR__ . '/index.html'));

    return $response;
});

$app->run();

