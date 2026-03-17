<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $employee_id = mysqli_real_escape_string($conn, $data["id"]);
    $employee_name = mysqli_real_escape_string($conn, $data["name"]);
    $employee_contact = mysqli_real_escape_string($conn,$data["contact"]);
    $position = mysqli_real_escape_string($conn,$data["position"]);

    $query = "INSERT INTO staff_member (employee_id,employee_name,employee_contact,position) 
                VALUES ('$employee_id','$employee_name','$employee_contact','$position')";
    if(mysqli_query($conn, $query)) {
        echo "Employee added successfully";
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
    
    $query = "DELETE FROM staff_member WHERE employee_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Employee deleted successfully";
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
    $employee_name = mysqli_real_escape_string($conn, $data["name"]);
    $employee_contact = mysqli_real_escape_string($conn,$data["contact"]);
    $position = mysqli_real_escape_string($conn,$data["position"]);

    $query = "UPDATE staff_member SET 
              employee_name = '$employee_name', employee_contact = '$employee_contact', position='$position' WHERE employee_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Employee updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["employee_id"])) 
{

    $id = mysqli_real_escape_string($conn, $_GET["employee_id"]);

    $query = "SELECT * FROM staff_member WHERE employee_id = '$id'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) 
    {
        $staff_member = mysqli_fetch_assoc($result);

        echo json_encode
        ([
            "status" => "success",
            "staff_member" => $staff_member

        ]);

    } 
    else 
    {
        echo json_encode
        ([
            "status" => "error",
            "message" => "Staff not found"
        ]);
    }

    exit;
}

if($method == "GET")
{
    $query = "SELECT * FROM staff_member";
    $result = mysqli_query($conn,$query);
    $employees = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $employees[] = $row;
    }
    echo json_encode($employees);
    exit;
}

