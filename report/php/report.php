<?php
    include "func.php";
    $id_user = 0;
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $same = alert_exist($_POST['lat'], $_POST['lon'], $_POST['error']);

        if($_POST['status'] == "report"){
            if(sizeof($same) == 0){
                report($_POST['photo'], $_POST['lat'], $_POST['lon'], $_POST['error'], $_POST['description'], $_POST['municipality'], $id_user, $_POST['id_type']);
                $response = array("status" => "reported");
            }else{
                $response = array("status" => "error", "same" => $same);
            }
        }
        if($_POST['status'] == "exist"){
            modify($_POST['id_alert'], $_POST['lat'], $_POST['lon'], $_POST['error']);
            $response = array("status" => "modified");
        }
        if($_POST['status'] == "not_exist"){
            report($_POST['photo'], $_POST['lat'], $_POST['lon'], $_POST['error'], $_POST['description'], $_POST['municipality'], $id_user, $_POST['id_type']);
            $response = array("status" => "reported");
        }

        header('Content-Type: application/json');
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        echo json_encode($response);
    }
?>