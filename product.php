<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $product_id = mysqli_real_escape_string($conn, $data["product_id"]);
    $employee_id = mysqli_real_escape_string($conn, $data["employee_id"]);
    $product_name = mysqli_real_escape_string($conn, $data["product_name"]);
    $product_brand = mysqli_real_escape_string($conn,$data["product_brand"]);
    $product_price = mysqli_real_escape_string($conn,$data["product_price"]);

    $query = "INSERT INTO product (product_id,employee_id,product_name,brand,price) 
                VALUES ('$product_id','$employee_id','$product_name','$product_brand','$product_price')";
    if(mysqli_query($conn, $query)) {
        echo "Product added successfully";
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
    
    $query = "DELETE FROM product WHERE product_id='$id' ";
    if(mysqli_query($conn,$query))
    {
        echo "Product deleted successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if($method == "PUT")
{
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["product_id"];
    $employee_id = mysqli_real_escape_string($conn, $data["employee_id"]);
    $product_name = mysqli_real_escape_string($conn, $data["product_name"]);
    $product_brand = mysqli_real_escape_string($conn,$data["product_brand"]);
    $product_price = mysqli_real_escape_string($conn,$data["product_price"]);
    
    $query = "UPDATE product SET 
              employee_id = '$employee_id', product_name = '$product_name', brand='$product_brand', price='$product_price'
              WHERE product_id = '$id' ";

    if(mysqli_query($conn,$query))
    {
        echo "Product updated successfully";
    }
    else
    {
        echo "Error: ".mysqli_error($conn);
    }
}

if ($method == "GET" && isset($_GET["product_id"])) 
{

    $id = mysqli_real_escape_string($conn, $_GET["product_id"]);

    $query = "SELECT * FROM product WHERE product_id = '$id'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) 
    {
        $product = mysqli_fetch_assoc($result);

        echo json_encode
        ([
            "status" => "success",
            "product" => $product

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
    $query = "SELECT * FROM product";
    $result = mysqli_query($conn,$query);
    $products = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $products[] = $row;
    }
    echo json_encode($products);
    exit;
}
