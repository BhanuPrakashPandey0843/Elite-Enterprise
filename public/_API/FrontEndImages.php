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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ensure that the necessary POST parameter is provided
    if (isset($_GET['FrontEnd_Id'])) {
        $frontEnd_Id = $_GET['FrontEnd_Id'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the input
        $frontEnd_Id = $conn->real_escape_string($frontEnd_Id);

        // SQL query to select the `Logo` from the `FrontEnd` table
        $sqlSelect = "SELECT `Logo` FROM `FrontEnd` WHERE `FrontEnd_Id` = $frontEnd_Id";

        // Execute the SQL query
        $result = $conn->query($sqlSelect);

        if ($result) {
            $data = $result->fetch_assoc();

            // Close the database connection
            $conn->close();

            if (empty($data)) {
                sendResponse(false, 'No data found for the specified FrontEnd_Id');
            } else {
                sendResponse(true, 'Data retrieved successfully', $data);
            }
        } else {
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide FrontEnd_Id.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}