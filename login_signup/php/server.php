<?php
    include "func.php";

    // session
    if (session_status() == PHP_SESSION_NONE)
        session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // login
        if ($_POST['status'] == 'login'){
            if(login($_POST['email'], $_POST['psw']))
                $response = array("status" => "login_success", "id" => $_SESSION['id']);
            else
                $response = array("status" => "login_failed");
        }

        // email
        if($_POST['status'] == 'email'){
            $_SESSION['otp'] = rand(1000, 9999);
            mail(
                $_POST['email'],
                'Codice OTP',
                'Questo è il tuo codice univoco per verificare la tua email:' . $_SESSION['otp'],
                'From: "Street Alert" <streetalert@altervista.org>'
            );
            $response = array("status" => "verify");
        }
        
        // verify
        if($_POST['status'] == 'verify'){
            if($_SESSION['otp'] == $_POST['otp']){
                $response = array("status" => "verify_success");
            	session_destroy();
            }else{
                $response = array("status" => "verify_failed");
            }
        }

        // sign up
        if($_POST['status'] == 'sign_up'){
            $Password = password_hash($_POST["psw"], PASSWORD_DEFAULT);
			
            if(sign_up($_POST['email'], $Password))
                $response = array("status" => "sign_up_success");
            else
                $response = array("status" => "sign_up_failed");
        }

        header('Content-Type: application/json');
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        echo json_encode($response);
    }
?>