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
    if (isset($_POST['User_ID'], $_POST['Product_id'], $_POST['Qty'])) {
        $user_id = $_POST['User_ID'];
        $product_id = $_POST['Product_id'];
        $qty = $_POST['Qty'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Check if the product already exists in the cart for the given user
        $sqlCheckExisting = "SELECT * FROM `UserCartDetails` WHERE `User_ID` = '$user_id' AND `Product_id` = '$product_id'";
        $result = $conn->query($sqlCheckExisting);

        if ($result->num_rows > 0) {
            // The product already exists in the cart, so update the quantity
            $sqlUpdateQty = "UPDATE `UserCartDetails` SET `Qty` = `Qty` + '$qty' WHERE `User_ID` = '$user_id' AND `Product_id` = '$product_id'";
            if ($conn->query($sqlUpdateQty)) {
                $conn->close();
                sendResponse(true, 'Quantity updated successfully');
            } else {
                sendResponse(false, 'Error updating the quantity', $conn->error);
            }
        } else {
            // The product does not exist in the cart, so insert a new record
            $sqlInsert = "INSERT INTO `UserCartDetails` (`User_ID`, `Product_id`, `Qty`) 
                          VALUES ('$user_id', '$product_id', '$qty')";
            if ($conn->query($sqlInsert)) {
                $conn->close();
                sendResponse(true, 'Data inserted successfully');
            } else {
                sendResponse(false, 'Error executing the SQL query', $conn->error);
            }
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide User_ID, Product_id, and Qty.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}