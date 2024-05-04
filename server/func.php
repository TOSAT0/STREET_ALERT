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
            $ris = $conn->query("SELECT * FROM users WHERE email='$email'");
        }catch(Exception $e){
            die("login");
        }
        if($ris -> num_rows > 0){
            $arr = $ris -> fetch_array(MYSQLI_ASSOC);
            $_SESSION["id"] = $arr["id_user"];
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
                die("sign_up");
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
            die("email_exist");
        }
        if($ris -> num_rows > 0)
            return true;
        return false;
    }

    // array: alerts exixts - null: alerts not exists
    function get_alerts() {
        $conn = connect();
        
        try {
            $result = $conn->query("SELECT * FROM alerts");
            if ($result->num_rows > 0) {
                $alerts_array = array();
                foreach($result as $row) {
                    array_push($alerts_array, $row);
                }
                return $alerts_array; 
            }
            return null;
        } catch (Exception $e) {
            die("get_alerts");
        }
    }
    
?>