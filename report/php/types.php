<?php
	include "func.php";
    $id_user = 0;
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    	$response = array("status" => "types", "id_user" => $id_user, "types" => get_types());
        
        header('Content-Type: application/json');
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        echo json_encode($response);
    }
?>