<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $customer_id = mysqli_real_escape_string($conn, $data["customer_id"]);
    $service_id = mysqli_real_escape_string($conn, $data["service_id"]);

    $query = "INSERT INTO take_services (customer_id,service_id) 
                VALUES ('$customer_id','$service_id')";
    if(mysqli_query($conn, $query)) {
        echo "Taken Service added successfully";
    } 
    else 
    {
        echo "Error: " . mysqli_error($conn);
    }
    exit;


}

if($method == "GET")
{
    $query = "SELECT c.customer_id,c.customer_name,s.service_id,s.service_name 
                FROM take_services ts,customer c,service s
                WHERE ts.customer_id=c.customer_id AND ts.service_id=s.service_id";
    $result = mysqli_query($conn,$query);
    $takenServices = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $takenServices[] = $row;
    }
    echo json_encode($takenServices);
    exit;
}
