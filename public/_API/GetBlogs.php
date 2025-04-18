<?php
// Include the database configuration file
require_once 'config.php';

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

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

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create a new MySQLi connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check for database connection errors
    if ($conn->connect_error) {
        sendResponse(false, 'Connection failed', $conn->connect_error);
    }

    // SQL query to select all records from the "Blogs" table
    $sqlSelectBlogs = "SELECT * FROM Blogs";

    // Execute the SQL query
    $result = $conn->query($sqlSelectBlogs);

    if ($result) {
        $blogs = array();
        while ($row = $result->fetch_assoc()) {
            $blogs[] = $row;
        }
        $conn->close();
        sendResponse(true, 'Blogs retrieved successfully', $blogs);
    } else {
        $conn->close();
        sendResponse(false, 'Error executing the SQL query', $conn->error);
    }
} else {
    sendResponse(false, 'Invalid request method. Please use GET for this operation.');
}