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
function sendResponse($status, $message) {
    $response = array(
        'status' => $status,
        'message' => $message
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure that the necessary POST parameter is provided
    if (isset($_POST['AddressID'])) {
        $addressID = $_POST['AddressID'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the input
        $addressID = $conn->real_escape_string($addressID);

        // SQL query to delete a record from the "Addresses" table based on AddressID
        $sqlDeleteAddress = "DELETE FROM Addresses WHERE AddressID = $addressID";

        // Execute the SQL query for deleting the address
        if ($conn->query($sqlDeleteAddress)) {
            $conn->close();
            sendResponse(true, 'Address deleted successfully');
        } else {
            $conn->close();
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide AddressID.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}