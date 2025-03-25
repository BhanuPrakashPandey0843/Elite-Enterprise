<?php
// Include the database configuration file
require_once 'config.php';

// Create a connection to the database
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to select all records from Home_Below_Slider_Images
$sql = "SELECT * FROM Home_Below_Slider_Images";

// Execute the query
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    $below_slider_images = array();

    // Fetch the results and store them in an array
    while ($row = $result->fetch_assoc()) {
        $below_slider_images[] = $row;
    }

    // Return the results as JSON
    header('Content-Type: application/json');
   // Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");

// Set the Access-Control-Allow-Headers header to allow the specified headers
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

    echo json_encode($below_slider_images);
} else {
    // If no results are found, return an empty JSON array
    echo json_encode(array());
}

// Close the database connection
$conn->close();
?>
