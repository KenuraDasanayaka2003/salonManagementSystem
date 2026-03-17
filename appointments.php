<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if($method=="POST")
    {
        $data = json_decode(file_get_contents("php://input"),true);
        $appointment_id = mysqli_real_escape_string($conn,$data["app_id"]);
        $customer_id = mysqli_real_escape_string($conn,$data["cus_id"]);
        $service_id = mysqli_real_escape_string($conn,$data["ser_id"]);
        $appointment_date = mysqli_real_escape_string($conn,$data["app_date"]);
        $appointment_time = mysqli_real_escape_string($conn,$data["app_time"]);

        $query = "INSERT INTO appointment (appointment_id,customer_id,service_id,appointment_date,appointment_time)
                VALUES ('$appointment_id','$customer_id','$service_id','$appointment_date','$appointment_time')";


            if(mysqli_query($conn,$query))
            {
                echo "appointment added successfully";
            }
            else
            {
                echo "Error : ".mysqli_error($conn);
            }
        exit;
    }

if ($method == "DELETE")
{
    $data = json_decode(file_get_contents("php://input"),true);
    $id = $data["id"];
    
    $query = "DELETE FROM appointment WHERE appointment_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Appointment deleted successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if($method == "PUT")
{
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["app_id"];
    $customer_id = mysqli_real_escape_string($conn,$data["cus_id"]);
    $service_id = mysqli_real_escape_string($conn,$data["ser_id"]);
    $appointment_date = mysqli_real_escape_string($conn,$data["app_date"]);
    $appointment_time = mysqli_real_escape_string($conn,$data["app_time"]);

    $query = "UPDATE appointment SET 
              customer_id = '$customer_id',service_id='$service_id',appointment_date='$appointment_date',appointment_time='$appointment_time'
              WHERE appointment_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Appointment updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["customer_id"])) 
{
    $id = mysqli_real_escape_string($conn, $_GET["customer_id"]);

    $query = "SELECT appointment_id,service_name,appointment_date,appointment_time
              FROM appointment a,service s WHERE a.service_id=s.service_id AND customer_id = '$id'";
    $result = mysqli_query($conn, $query);

    $appointments = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $appointments[] = $row;
    }

    echo json_encode($appointments); 
    exit;
}

if ($method == "GET" && isset($_GET["appointment_id"])) 
{
    $id = mysqli_real_escape_string($conn, $_GET["appointment_id"]);

    $query = "SELECT customer_name,service_name,appointment_date,appointment_time
              FROM appointment a,service s,customer c WHERE a.service_id=s.service_id AND a.customer_id=c.customer_id 
              AND appointment_id = '$id'";
    $result = mysqli_query($conn, $query);

    $appointments = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $appointments[] = $row;
    }

    echo json_encode($appointments); 
    exit;
}

if($method == "GET")
{
    $query = "SELECT appointment_id,customer_name,service_name,appointment_date,appointment_time
                FROM appointment a,customer c,service s WHERE a.service_id=s.service_id AND a.customer_id=c.customer_id";
    $result = mysqli_query($conn,$query);
    $appointments = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $appointments[] = $row;
    }
    echo json_encode($appointments);
    exit;
}
