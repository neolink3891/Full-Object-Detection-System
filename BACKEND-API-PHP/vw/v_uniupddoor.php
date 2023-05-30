<?php
    header('Content-type: application/json');

    $c = 0;
    $jsondata = array();
    $dats = array();
    $smen = "";
    $sres = "";
    
    foreach ($datos as $da) {
        $smen = $da['SMEN'];
        $sres = $da['SRES'];
        
        $dato = ["res" => $sres, "men" => $smen];
        array_push($jsondata, $dato);
        $c = $c + 1;
    }
    
    $dat = ["out" => $c, "sta" => "OK", "dtarray" => $jsondata];
    array_push($dats, $dat);
    
    $response = ["writer" => "nlk-json-writer", "version" => "3.0", "server" => "local-testing", "dats" => $dats];
    
    echo json_encode($response, JSON_PRETTY_PRINT);