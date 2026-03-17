<?php
include "database.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);
    $customer_id = mysqli_real_escape_string($conn, $data["customer_id"]);
    $product_id = mysqli_real_escape_string($conn,$data["product_id"]);

    $query = "INSERT INTO buy_products (customer_id,product_id) 
                VALUES ('$customer_id','$product_id')";
    if(mysqli_query($conn, $query)) {
        echo "Purchase added successfully";
    } 
    else 
    {
        echo "Error: " . mysqli_error($conn);
    }
    exit;


}

if($method == "GET")
{
    $query = "SELECT c.customer_id,c.customer_name,p.product_id,p.product_name 
                FROM buy_products bp,customer c,product p
                WHERE bp.customer_id=c.customer_id AND bp.product_id=p.product_id";
    $result = mysqli_query($conn,$query);
    $purchaseProducts = [];
    while($row = mysqli_fetch_assoc($result))
    {
        $purchaseProducts[] = $row;
    }
    echo json_encode($purchaseProducts);
    exit;
}
