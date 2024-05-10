<?php
require('server.php');

$conn = conn();

$query = "SELECT * FROM alerts";

$ris = $conn -> query($query);

$data = array();

foreach($ris as $alert)
{
    $data[] = array(
        'id' => $alert['id_alert'], 
        'photo' => $alert['photo'], 
        'start_date' => $alert['start_date'],
        'end_date' => $alert['end_date'], 
        'lat' => $alert['lat'], 
        'lon' => $alert['lon'], 
        'description' => $alert['description'], 
        'state' => $alert['state'], 
        'id_municipality' => $alert['id_municipality']
    );
}

$jsonCoords = json_encode($data);
echo $jsonCoords;
