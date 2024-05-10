<?php

function conn()
{
    $host = "127.0.0.1";
    $user = "root";
    $pw = "";
    $db = "my_streetalert";

    return new mysqli($host, $user, $pw, $db);
}
