<?php
// Include the config file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");

// Set the Access-Control-Allow-Headers header to allow the specified headers
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

// Check if the ConnectedToBrand_id parameter is provided
if (isset($_GET['ConnectedToBrand_id'])) {
    // Sanitize the input to prevent SQL injection
    $ConnectedToBrand_id = intval($_GET['ConnectedToBrand_id']);
    
    // Prepare and execute the SQL query with sanitized input
    $sql = "SELECT * FROM Products WHERE ConnectedToBrand_id = " . $ConnectedToBrand_id;
    $result = $conn->query($sql);
    
    // Create an array to store the data
    $data = array();

    // Fetch the data and add it to the array
    while ($row = $result->fetch_assoc()) {
        $row['isFeatured'] = ($row['isFeatured'] === "1") ? true : false;
        $row['isSale'] = ($row['isSale'] === "1") ? true : false;
        $row['isNew'] = ($row['isNew'] === "1") ? true : false;
        $data[] = $row;
    }

    // Return the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // If ConnectedToBrand_id parameter is not provided, return an error message
    echo "Error: ConnectedToBrand_id parameter is missing.";
}

// Close the database connection
$conn->close();
?>