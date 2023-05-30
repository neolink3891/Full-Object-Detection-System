<?php
//NeoLink 2023

    require_once("db/db.php");
    $destiny = $_GET['requested'];
    
    if(!is_null($destiny)){
        if(preg_match('/^[a-z]{5}$/', $destiny)){
            switch ($destiny){
                case "unids":
                    $_POST['v1'] = $_GET['dn']; //tip
                    $_POST['v2'] = $_GET['ie']; //usu
                    
                    require_once("cntrllr/c_uniupddoor.php");
                    break;
                default:
                    $response = ["writer" => "nlk-json-writer", "version" => "3.0", "server" => "local-testing", "problem" => "destiny-not-found"];
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    break;
            }
        } else {
            $response = ["writer" => "nlk-json-writer", "version" => "3.0", "server" => "local-testing", "problem" => "invalid-requested"];
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    } else {
        $response = ["writer" => "nlk-json-writer", "version" => "3.0", "server" => "local-testing", "problem" => "request-not-found"];
        echo json_encode($response, JSON_PRETTY_PRINT);
    }