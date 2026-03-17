<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $service_id = mysqli_real_escape_string($conn, $data["id"]);
    $service_name = mysqli_real_escape_string($conn, $data["name"]);
    $service_charge = mysqli_real_escape_string($conn,$data["charge"]);

    $query = "INSERT INTO service (service_id, service_name ,service_charge) 
                VALUES ('$service_id','$service_name','$service_charge')";
    if(mysqli_query($conn, $query)) {
        echo "Service added successfully";
    } 
    else 
    {
        echo "Error: " . mysqli_error($conn);
    }
    exit;


}

if ($method == "DELETE")
{
    $data = json_decode(file_get_contents("php://input"),true);
    $id = $data["id"];
    
    $query = "DELETE FROM service WHERE service_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Service deleted successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if($method == "PUT")
{
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $service_name = mysqli_real_escape_string($conn, $data["name"]);
    $service_charge = mysqli_real_escape_string($conn, $data["charge"]);

    $query = "UPDATE service SET service_name = '$service_name', service_charge = '$service_charge' WHERE service_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Service updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["service_id"])) 
{

    $id = mysqli_real_escape_string($conn, $_GET["service_id"]);

    $query = "SELECT * FROM service WHERE service_id = '$id'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) 
    {
        $service = mysqli_fetch_assoc($result);

        echo json_encode
        ([
            "status" => "success",
            "service" => $service

        ]);

    } 
    else 
    {
        echo json_encode
        ([
            "status" => "error",
            "message" => "Service not found"
        ]);
    }

    exit;
}

if($method == "GET")
{
    $query = "SELECT * FROM service";
    $result = mysqli_query($conn,$query);
    $services = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $services[] = $row;
    }
    echo json_encode($services);
    exit;
}