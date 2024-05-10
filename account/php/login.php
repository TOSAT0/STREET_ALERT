<?php
require('server.php');

$conn = conn();

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