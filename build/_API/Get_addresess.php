<?php
// Include the database configuration file
require_once 'config.php';

    // Set the Access-Control-Allow-Origin header to allow requests from any origin
    header("Access-Control-Allow-Origin: *");

    // Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
    header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");

    // Set the Access-Control-Allow-Headers header to allow the specified headers
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

// Function to set the HTTP response status code and send a JSON response
function sendResponse($status, $message, $data = null) {
    $response = array(
        'status' => $status,
        'message' => $message
    );
    if ($data !== null) {
        $response['data'] = $data;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Check if a user ID is provided as a query parameter
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    // Create a new MySQLi connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check for database connection errors
    if ($conn->connect_error) {
        sendResponse(false, 'Connection failed', $conn->connect_error);
    }

    // SQL query to select data from the "Addresses" table for the given user ID
    $sqlBrands = "SELECT * FROM `Addresses` WHERE UserID = $user_id";

    // Execute the SQL query
    $result = $conn->query($sqlBrands);

    if ($result) {
        $data = array();

        // Fetch data as associative array
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Close the database connection
        $conn->close();

        if (empty($data)) {
            sendResponse(false, 'No data found for the specified user ID');
        } else {
            sendResponse(true, 'Data retrieved successfully', $data);
        }
    } else {
        sendResponse(false, 'Error executing the SQL query', $conn->error);
    }
} else {
    sendResponse(false, 'User ID not provided');
}
