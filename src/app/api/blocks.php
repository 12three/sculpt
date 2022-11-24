<?php
require_once 'src/app/index.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use MongoDB\BSON\ObjectID;

$app->group('/api', function ($group) use ($db) {
    $group->get('/blocks', function (Request $request, Response $response) use($db) {
        $raw_blocks = $db->blocks->find()->toArray();
        $blocks = array_map(function($block) {
            return array_merge((array)$block, ['_id' => (string)$block['_id']]);
        }, $raw_blocks);

        $response->withHeader('Content-Type', 'application/json');
        $response->getBody()->write(json_encode($blocks));

        return $response;
    });
    
    $group->post('/blocks', function (Request $request, Response $response) use($db) {
        $new_block = $request->getParsedBody();

        $db->blocks->insertOne($new_block);
        
        return $response;
    });


    $group->delete('/blocks/{id}', function (Request $request, Response $response, array $args) use($db) {
        $db->blocks->deleteOne(['_id' => new ObjectID($args['id'])]);

        // $response->getBody()->write();
        
        return $response;
    });
});
