<?php

require('query.php');

if(($_GET['send']) == "getCoords")
{
    getCoords();
}

function getCoords()
{
    $data = array();

    // prendo i dati dal database attraverso la funzione 
    // alerts() che va ad effettuare la query 
    $getCoords = alerts();

    foreach($getCoords as $alert)
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

    // trasformo l'array associativo in formato JSON 
    $jsonCoords = json_encode($data);
    echo $jsonCoords;
}

?>