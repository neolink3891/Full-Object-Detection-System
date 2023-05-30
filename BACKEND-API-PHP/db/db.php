<?php

class Conectar {
    public static function conexion(){
        $dbserver = "dbserver";
        $dbuser = "dbuser";
        $dbpass = "dbpass";
        $dbname = "dbname";
    
        $conexion=new mysqli($dbserver, $dbuser, $dbpass, $dbname);
        $conexion->multi_query("SET NAMES 'utf8'");

        return $conexion;
    }
}
