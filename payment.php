<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $payment_id = mysqli_real_escape_string($conn, $data["payment_id"]);
    $customer_id = mysqli_real_escape_string($conn, $data["customer_id"]);
    $payment_date = mysqli_real_escape_string($conn,$data["payment_date"]);
    $payment_time = mysqli_real_escape_string($conn,$data["payment_time"]);
    $payment_amount = mysqli_real_escape_string($conn,$data["payment_amount"]);

    $query = "INSERT INTO payment (payment_id,customer_id,payment_date,payment_time,payment_amount) 
                VALUES ('$payment_id','$customer_id','$payment_date','$payment_time','$payment_amount')";
    if(mysqli_query($conn, $query)) {
        echo "Payment added successfully";
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
    
    $query = "DELETE FROM payment WHERE payment_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Payment deleted successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if($method == "PUT")
{
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["payment_id"];
    $customer_id = mysqli_real_escape_string($conn, $data["customer_id"]);
    $payment_date = mysqli_real_escape_string($conn,$data["payment_date"]);
    $payment_time = mysqli_real_escape_string($conn,$data["payment_time"]);
    $payment_amount = mysqli_real_escape_string($conn,$data["payment_amount"]);

    $query = "UPDATE payment SET 
              customer_id = '$customer_id', payment_date = '$payment_date', payment_time='$payment_time',payment_amount='$payment_amount'
              WHERE payment_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Payment updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["payment_id"])) 
{

    $id = mysqli_real_escape_string($conn, $_GET["payment_id"]);

    $query = "SELECT * FROM payment WHERE payment_id = '$id'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) 
    {
        $payment = mysqli_fetch_assoc($result);

        echo json_encode
        ([
            "status" => "success",
            "payment" => $payment

        ]);

    } 
    else 
    {
        echo json_encode
        ([
            "status" => "error",
            "message" => "Payment not found"
        ]);
    }

    exit;
}

if($method == "GET")
{
    $query = "SELECT * FROM payment";
    $result = mysqli_query($conn,$query);
    $payments = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $payments[] = $row;
    }
    echo json_encode($payments);
    exit;
}
