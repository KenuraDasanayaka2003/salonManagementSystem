<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $customer_id = mysqli_real_escape_string($conn, $data["id"]);
    $customer_name = mysqli_real_escape_string($conn, $data["name"]);
    $customer_email = mysqli_real_escape_string($conn,$data["email"]);
    $contact_no = mysqli_real_escape_string($conn,$data["contact"]);

    if ($customer_id == '')
    {
        $customer_id = NULL;
    }

    if ($customer_name == '')
    {
        $customer_name = NULL;
    }

    $query = "INSERT INTO customer (customer_id,customer_name,customer_email,contact_no) 
                VALUES ('$customer_id','$customer_name','$customer_email','$contact_no')";
    if(mysqli_query($conn, $query)) {
        echo "Customer added successfully";
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
    
    $query = "DELETE FROM customer WHERE customer_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Customer deleted successfully";
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
    $customer_name = mysqli_real_escape_string($conn, $data["name"]);
    $customer_email = mysqli_real_escape_string($conn,$data["email"]);
    $contact_no = mysqli_real_escape_string($conn,$data["contact"]);

    $query = "UPDATE customer SET 
              customer_name = '$customer_name', customer_email = '$customer_email', contact_no = '$contact_no' WHERE customer_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Customer updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["customer_id"])) 
{

    $id = mysqli_real_escape_string($conn, $_GET["customer_id"]);

    $query = "SELECT * FROM customer WHERE customer_id = '$id'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) 
    {
        $customer = mysqli_fetch_assoc($result);

        echo json_encode
        ([
            "status" => "success",
            "customer" => $customer

        ]);

    } 
    else 
    {
        echo json_encode
        ([
            "status" => "error",
            "message" => "Customer not found"
        ]);
    }

    exit;
}

if($method == "GET")
{
    $query = "SELECT * FROM customer";
    $result = mysqli_query($conn,$query);
    $customers = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $customers[] = $row;
    }
    echo json_encode($customers);
    exit;
}


