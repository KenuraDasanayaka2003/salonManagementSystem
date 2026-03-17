<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $employee_id = mysqli_real_escape_string($conn, $data["employee_id"]);
    $service_id = mysqli_real_escape_string($conn, $data["service_id"]);

    $query = "INSERT INTO provide_services (employee_id,service_id) 
                VALUES ('$employee_id','$service_id')";
    if(mysqli_query($conn, $query)) {
        echo "Providing Service added successfully";
    } 
    else 
    {
        echo "Error: " . mysqli_error($conn);
    }
    exit;


}

if($method == "GET")
{
    $query = "SELECT e.employee_id,e.employee_name,s.service_id,s.service_name 
                FROM provide_services ps,staff_member e,service s
                WHERE ps.employee_id = e.employee_id AND ps.service_id = s.service_id";
    $result = mysqli_query($conn,$query);
    $provideServices = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $provideServices[] = $row;
    }
    echo json_encode($provideServices);
    exit;
}
