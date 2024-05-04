<?php
    include "func.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $status = $_POST["status"];

        switch($status){
            case "login":
                if(login($_POST['email'], $_POST['psw']))
                    $response = array("status" => "login_success", "id" => $_SESSION['id']);
                else
                    $response = array("status" => "login_failed");
                break;
            case "signup":

                break;
            // case "table":
            //     $alerts = get_alerts();
            //     if($alerts)
            //         $response = array("status" => "table_success", "alerts" => $alerts);
            //     else
            //         $response = array("status" => "table_failed")
            //     break;
        }
    }

    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $alerts = get_alerts();
        if($alerts)
            $response = array("status" => "table_success", "alerts" => $alerts);
        else
            $response = array("status" => "table_failed");
    }

    header('Content-Type: application/json');
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    echo json_encode($response);

?>