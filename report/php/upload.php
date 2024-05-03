<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            move_uploaded_file($_FILES["image"]["tmp_name"], "../uploads/" . $_POST['photo']);
        }
        
        header('Content-Type: application/json');
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        echo json_encode(array("status" => "photo"));
    }
?>
