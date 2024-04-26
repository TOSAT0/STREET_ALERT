<?php

    // CONNECTION TO THE DATABASE
    function connect(){
        try{
            return new mysqli("localhost", "root", "", "my_streetalert");
        }catch(Exception $e){
            die("connect");
        }
    }

    // ADD A NEW ALERT TO THE ALERTS TABLE
    function report($photo, $lat, $lon, $error, $description, $id_municipality, $id_user, $id_type){
        $conn = connect();

        try{
            $conn->query("INSERT INTO alerts VALUES(NULL, '$photo', NOW(), NULL, $lat, $lon, $error, '$description', 'NEW', DEFAULT, $id_user, $id_type, $id_municipality)");
        }catch(Exception $e){
            die("report");
        }
    }

    // INCREASE THE NUMBER OF REPORT
    function modify($id_alert, $lat, $lon, $error){
        $conn = connect();
        
        try{
            $conn->query("UPDATE alerts SET lat = $lat, lon = $lon, error = $error, times = times+1 WHERE id_alert = $id_alert");
        } catch(Exception $e){
            die("modify");
        }
    }

    // CHECK IF THE ALERT ALREADY EXISTS
    function alert_exist($lat, $lon, $error){
        $conn = connect();
        $same = array();
        $alerts = get_alerts(array("NEW","SEEN","SOLVED"));
        
        foreach($alerts as $row){
            $dis = rad2deg(acos(sin(deg2rad($lat)) * sin(deg2rad($row['lat'])) + cos(deg2rad($lat)) * cos(deg2rad($row['lat'])) * cos(deg2rad($lon - $row['lon'])))) * 69090 * 1.609344;
            if($dis <= $error + $row['error'])
                array_push($same, $row);
        }
        return $same;
    }

    // GET AN ALERT FROM AN ID
    function get_alert($id_alert){
        $conn = connect();
        echo "id_alert: $id_alert";

        try {
            $res = $conn->query("SELECT * FROM alerts WHERE id_alert=$id_alert");
            return $res->fetch_assoc();
        } catch(Exception $e){
            die("get_alert");
        }
    }

    // GET A SPECIFIC ALERT CATEGORY
    function get_alerts($states) {
        $conn = connect();
        $stateList = implode("','", $states);
        
        try {
            return $conn->query("SELECT * FROM alerts WHERE state IN ('$stateList')");
        } catch (Exception $e) {
            die("get_alerts");
        }
    }
    
    // GET ALL THE TYPES
    function get_types(){
    	$conn = connect();
        
        try {
        	$res = $conn->query("SELECT * FROM types");
            return $res->fetch_all(MYSQLI_ASSOC);
        } catch(Exception $e) {
        	die("get_types");
        }
    }

    // MOVE THE ALERT FROM ALERTS TABLE TO OLD_ALERTS TABLE
    function move_alert($id_alert){
        $conn = connect();
        $alert =get_alert($id_alert);

        try {
            $conn->query("INSERT INTO old_alerts VALUES($id_alert,'".$alert['date']."',".$alert['lat'].",".$alert['lon'].",'".$alert['description']."',".$alert['id_user'].",".$alert['id_type'].")");
        } catch(Exception $e){
            die("move_alert");
        }
    }

    // GET ID MUNICIPALITY
    function id_municipality($municipality){
        $conn = connect();

        try{
            $res = $conn->query("SELECT id_municipality FROM municipalities WHERE name = '$municipality'");
            $row = $res->fetch_assoc();
            return $row['id_municipality'];
        }catch(Exeption $e){
            die("id_municipality");
        }
    }

?>