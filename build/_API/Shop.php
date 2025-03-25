<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

    // Return the results as JSON
    header('Content-Type: application/json');
    // Set the Access-Control-Allow-Origin header to allow requests from any origin
    header("Access-Control-Allow-Origin: *");
    
    // Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
    header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
    
    // Set the Access-Control-Allow-Headers header to allow the specified headers
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

// SQL query to select all products from the Products table
$sql = "SELECT * FROM Products";

// Execute the query
$result = $conn->query($sql);

if ($result) {
    $products = array();

    // Fetch the results and store them in an array
    while ($row = $result->fetch_assoc()) {
        // Convert the string values to boolean values
        $row['isFeatured'] = ($row['isFeatured'] === "1") ? true : false;
        $row['isSale'] = ($row['isSale'] === "1") ? true : false;
        $row['isNew'] = ($row['isNew'] === "1") ? true : false;
        $products[] = $row;
    }

    // Return the results as JSON
    echo json_encode(array('status' => true, 'products' => $products));
} else {
    // Error in executing the query
    echo json_encode(array('status' => false, 'message' => 'Error: ' . $conn->error));
}

// Close the database connection
$conn->close();
?>
