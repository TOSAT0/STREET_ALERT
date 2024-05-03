<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $status = $_POST["status"];

        switch($status){
            case "login":
                $contents = get_contents($_POST["id_list"]);
                $response = array("status" => $contents ? "success-old_contents" : "error-old_contents", "contents" => $contents);
                break;
            case "signup":
                $status = update_content($_POST["id_content"], $_POST["content_name"], $_POST["check_view"]);
                $response = array("status" => $status ? "success-update_content" : "error-update_content");
                break;
        }

        header('Content-Type: application/json');
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        echo json_encode($response);
    }
?>