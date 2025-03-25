<?php
// Include the database configuration file
require_once 'config.php';

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");

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

// Check if the request method is POST or DELETE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure that the necessary POST or DELETE parameters are provided
    if (isset($_POST['UserCartDetails_ID'])) {
        $userCartDetailsID = $_POST['UserCartDetails_ID'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        if (!isset($_POST['Delete'])) {
            // Check if 'Qty' is provided in POST parameters for updating
            if (isset($_POST['Qty'])) {
                $qty = $_POST['Qty'];

                // SQL query to update the "Qty" field in the "UserCartDetails" table
                $sqlUpdate = "UPDATE `UserCartDetails` SET `Qty` = '$qty' WHERE `UserCartDetails_ID` = $userCartDetailsID";

                // Execute the SQL query for updating
                if ($conn->query($sqlUpdate)) {
                    $conn->close();
                    sendResponse(true, 'Data updated successfully');
                } else {
                    sendResponse(false, 'Error executing the SQL query for updating', $conn->error);
                }
            } else {
                sendResponse(false, 'Incomplete POST data. Please provide Qty for updating.');
            }
        } else {
            // SQL query to delete records from the "UserCartDetails" table
            $sqlDelete = "DELETE FROM `UserCartDetails` WHERE `UserCartDetails_ID` = $userCartDetailsID";

            // Execute the SQL query for deleting
            if ($conn->query($sqlDelete)) {
                $conn->close();
                sendResponse(true, 'Data deleted successfully');
            } else {
                sendResponse(false, 'Error executing the SQL query for deleting', $conn->error);
            }
        }
    } else {
        sendResponse(false, 'Incomplete parameters. Please provide UserCartDetails_ID.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST or DELETE for this operation.');
}
