<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if a POST request with brand data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['Subcat_Name'], $_POST['ConnectedToBrand_id'])) {
    
    // Sanitize and prepare the input data
    $Subcat_Name = $conn->real_escape_string($_POST['Subcat_Name']);
    $ConnectedToBrand_id = $conn->real_escape_string($_POST['ConnectedToBrand_id']);
    
    // SQL query to insert the brand data into Brands
    $sql = "INSERT INTO `Brands_Subcat`(`Subcat_Name`, `ConnectedToBrand_id`) VALUES ('$Subcat_Name','$ConnectedToBrand_id')";
    
    // Execute the query
    if ($conn->query($sql) === TRUE) {
        // Insertion successful
        echo json_encode(array('Status' => true, 'message' => 'Brand inserted successfully'));
    } else {
        // Insertion failed
        echo json_encode(array('Status' => false, 'message' => 'Error: ' . $conn->error));
    }
    
} else {
    // Missing required data
    echo json_encode(array('Status' => false, 'message' => 'Missing brand data'));
}
?>