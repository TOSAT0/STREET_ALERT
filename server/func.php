<?php
    if (session_status() == PHP_SESSION_NONE)
        session_start();

    function connect(){
        try{
            return new mysqli("localhost", "root", "", "my_streetalert");
        }catch(Exception $e){
            die("connect");
        }
    }

    // true: user exists - false: user does not exist
    function login($email, $psw){
        $conn = connect();

        try{
            $ris = $conn->query("SELECT * FROM users AS U
                                 INNER JOIN municipalities AS M USING(id_user)
                                 WHERE U.email = '$email'
                                ");
        }catch(Exception $e){
            return false;
        }

        if($ris -> num_rows > 0){
            $arr = $ris -> fetch_array(MYSQLI_ASSOC);
            $_SESSION["id"] = $arr["id_municipality"];
            if(password_verify($psw, $arr['password']))
                return true;
            return false;
        }
        return false;
    }

    // true: user registereds - false: user not registered
    function sign_up($email, $psw){
        $conn = connect();

        if(!email_exist($email)){
            try{
                $conn->query("INSERT INTO users VALUES(null,'$email','$psw')");
            }catch(Exception $e){
                return false;
            }
            return true;
        }
        return false;      
    }

    // true: email exists - false: email does not exist
	function email_exist($email){
        $conn = connect();
        
        try{
            $ris = $conn->query("SELECT * FROM users WHERE email='$email'");
        }catch(Exception $e){
            return false;
        }
        if($ris -> num_rows > 0)
            return true;
        return false;
    }

    // array: alerts exixts - null: alerts not exists
    function get_alerts($id_municipality) {
        $conn = connect();
        
        try {
            $query = "SELECT * FROM alerts";
            if($id_municipality != 0)
                $query .= " WHERE id_municipality = $id_municipality";
            $query .= " ORDER BY state";
            
            $result = $conn->query($query);
            if ($result->num_rows > 0) {
                $alerts_array = array();
                foreach($result as $row) {
                    array_push($alerts_array, $row);
                }
                return $alerts_array; 
            }
            return null;
        } catch (Exception $e) {
            return null;
        }
    }

    // true: alert updated - false: alert not updated
    function update($id_alert, $state){
        $conn = connect();

        try {
            $query = "UPDATE alerts SET state = '$state' ";
            if($state == "SOLVED")
                $query .= ", end_date = CURDATE() ";
            $query .= "WHERE id_alert = $id_alert";

            $conn->query($query);
            return true;
        } catch(Exception $e) {
            die("update" . $e->getMessage());
        }
    }

    // true: alert exist - flase: alert doesnt exist
    function delete($id_alert){
        $conn = connect();

        try {
            $conn->query("DELETE FROM alerts WHERE id_alert = $id_alert");
            return true;
        } catch(Exception $e) {
            return false;
        }
    }
    
?>