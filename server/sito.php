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
                    // TODO
                break;
            case "table":
                $alerts = get_alerts($_POST['id']);
                if($alerts)
                    $response = array("status" => "table_success", "alerts" => $alerts);
                else
                    $response = array("status" => "table_failed");
                break;
            case "update":
                if($_POST['state'] == "DELETE")
                    $res = delete($_POST['id']);
                else
                    $res = update($_POST['id'], $_POST['state']);
                if($res)
                    $response = array("status" => "update_success");
                else
                    $response = array("status" => "update_error");
                break;
        }
    }

    header('Content-Type: application/json');
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    echo json_encode($response);

?>