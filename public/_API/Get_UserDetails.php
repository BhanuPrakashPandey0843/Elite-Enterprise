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
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure that the necessary POST parameter is provided
    if (isset($_POST['UserID'])) {
        $user_id = $_POST['UserID'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // SQL query to retrieve profile details by joining the UserDetails and Login tables
        $sqlSelect = $sqlSelectExisting = "SELECT * FROM UserDetails, Login WHERE UserDetails.User_ID = $user_id AND Login.User_ID = $user_id";

        // Execute the SQL query
        $result = $conn->query($sqlSelect);

        if ($result) {
            $data = $result->fetch_assoc();

            // Close the database connection
            $conn->close();

            if (empty($data)) {
                sendResponse(false, 'No profile details found for the specified user ID');
            } else {
                sendResponse(true, 'Profile details retrieved successfully', $data);
            }
        } else {
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide UserID.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}