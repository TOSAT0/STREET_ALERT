<?php

$host = "127.0.0.1";
$user = "root";
$pw = "";
$db = "my_streetalert";

$conn = new mysqli($host, $user, $pw, $db);

$query = "SELECT email FROM users WHERE id_user=".$_POST['id'];

$ris = $conn -> query($query);

$data = "";

foreach($ris as $v)
{
    $data = array(
        'email' => $v['email']
    );
}

$jsonCoords = json_encode($data);
echo $jsonCoords;