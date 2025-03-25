<?php
header('Content-Type: application/json');

// Include your database connection file
include '../config/dbconnect.php'; // Adjust the path as needed

// Get the product ID from the request
$product_id = isset($_GET['Product_id']) ? intval($_GET['Product_id']) : 0;

$response = array();

// Validate product ID
if ($product_id > 0) {
    // Prepare the SQL query
    $query = "SELECT 
                Product_id, 
                Product_name, 
                Product_desc, 
                Product_desc_long, 
                Product_originalPrice, 
                Product_offerPrice, 
                Stock, 
                Alert_Stock_Below, 
                isFeatured, 
                isSale, 
                isNew, 
                ConnectedToBrand_id, 
                ConnectedToSubBrand_id
              FROM Products
              WHERE Product_id = $product_id";
              
    // Execute the query
    $result = $conn->query($query);

    // Check if the query was successful and if a product was found
    if ($result) {
        if ($result->num_rows > 0) {
            // Fetch the product details
            $product = $result->fetch_assoc();
            $response['Status'] = true;
            $response['product'] = $product;
        } else {
            $response['Status'] = false;
            $response['Message'] = 'Product not found.';
        }

        // Free result set
        $result->free();
    } else {
        $response['Status'] = false;
        $response['Message'] = 'Database query error: ' . $conn->error;
    }
} else {
    $response['Status'] = false;
    $response['Message'] = 'Invalid product ID.';
}

// Close the database connection
$conn->close();

// Output the response in JSON format
echo json_encode($response);
?>