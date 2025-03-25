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
    // Ensure that the necessary POST parameters are provided
    if (isset($_POST['UserID'], $_POST['Name'], $_POST['StreetAddress'], $_POST['City'], $_POST['State'], $_POST['ZipCode'], $_POST['Contry'])) {
        $user_id = $_POST['UserID'];
        $Name = $_POST['Name'];
        $street_address = $_POST['StreetAddress'];
        $city = $_POST['City'];
        $state = $_POST['State'];
        $zip_code = $_POST['ZipCode'];
        $Contry = $_POST['Contry'];
        $company = isset($_POST['company']) ? $_POST['company'] : ''; // Set company to an empty string if not provided
        $gst = isset($_POST['gst']) ? $_POST['gst'] : ''; // Set gst to an empty string if not provided

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // SQL query to insert a new record into the "Addresses" table
        $sqlInsert = "INSERT INTO `Addresses` (`UserID`, `Name`, `StreetAddress`, `City`, `State`, `ZipCode`, `Contry`, `company`, `gst`) 
                      VALUES ('$user_id', '$Name', '$street_address', '$city', '$state', '$zip_code', '$Contry', '$company', '$gst')";

        // Execute the SQL query
        if ($conn->query($sqlInsert)) {
            $conn->close();
            sendResponse(true, 'Data inserted successfully');
        } else {
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide UserID, Name, StreetAddress, City, State, ZipCode, and Contry.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}
