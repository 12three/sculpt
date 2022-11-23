<?php
require_once 'src/app/index.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->group('/api', function ($group) use ($db) {
    $group->get('/blocks', function (Request $request, Response $response) use($db) {
        $blocks = $db->blocks->find()->toArray();

        $response->withHeader('Content-Type', 'application/json');
        $response->getBody()->write(json_encode($blocks));

        return $response;
    });
    
    $group->post('/blocks', function (Request $request, Response $response) {
        $body = $request->getParsedBody();

        $response->getBody()->write(json_encode($body));

        return $response;
    });
});
