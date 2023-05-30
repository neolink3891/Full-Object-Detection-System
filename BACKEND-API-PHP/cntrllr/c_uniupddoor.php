<?php
//NeoLink 2023
require_once("clases/gump.class.php");

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);
$_POST = $gump->xss_clean($_POST);

$gump->validation_rules(
    array(
        'v1'=>'required|min_len,1|max_len,10',
        'v2'=>'required|min_len,1|max_len,10'
    )
);

$gump->filter_rules(
    array(
        'v1'=>'trim|sanitize_string',
        'v2'=>'trim|sanitize_string'
    )
);

$datos_validos = $gump->run($_POST);

if($datos_validos === false) {
    $error=$gump->get_errors_array();
    echo '<pre>';
    var_dump($error);
    echo '</pre>';
} else {
    require_once("mdl/m_uniupddoor.php");
    $darray = new m_uniupddoor();
    $datos=$darray->get_data($datos_validos);
    require_once("vw/v_uniupddoor.php");
}