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
    if (isset($_POST['ZipCode'])) {
        $zipCode = $_POST['ZipCode'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the input
        $zipCode = $conn->real_escape_string($zipCode);

        // SQL query to select records from the "AvailableZipCodes" table based on ZipCode
        $sqlSelectZipCode = "SELECT * FROM AvalableZipCodes WHERE ZipCode = '$zipCode'";

        // Execute the SQL query for selecting zip codes
        $result = $conn->query($sqlSelectZipCode);

        if ($result) {
            $zipCodes = array();
            while ($row = $result->fetch_assoc()) {
                $zipCodes[] = $row;
            }
            $conn->close();

            if (count($zipCodes) > 0) {
                sendResponse(true, 'Zip codes retrieved successfully', $zipCodes);
            } else {
                sendResponse(false, 'No matching zip codes found');
            }
        } else {
            $conn->close();
            sendResponse(false, 'Error executing the SQL query', $sqlSelectZipCode);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide ZipCode.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}