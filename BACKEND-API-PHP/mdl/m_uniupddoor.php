<?php
//NeoLink 2023

class m_uniupddoor{
    private $db;
    private $darray;
    
    public function __construct(){
        $this->db=Conectar::conexion();
        $this->darray=array();
    }
    
    public function get_data($dato){
        try {
            $v1 = $dato['v1'];
            $v2 = $dato['v2'];
            
            $consulta=$this->db->query("CALL uniUpdateDoorStatus(" . $v1 . "," . $v2 . ")");
            
            while($filas=$consulta->fetch_assoc()){
                $this->darray[]=$filas;
            }
            return $this->darray;
        } catch (Exception $ex) {
            var_dump($ex);
            return null;
        }
    }
}