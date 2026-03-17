<?php
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "salonmanagement";

$conn = mysqli_connect($db_server,$db_username,$db_password,$db_name);

if(!$conn)
    {
        die("Database Connection failed : ".mysqli_connect_error());
    }

