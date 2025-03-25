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
    if (isset($_POST['User_ID'])) {
        $user_id = $_POST['User_ID'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the input
        $user_id = $conn->real_escape_string($user_id);

        // Check if Order_ID is provided
        if (isset($_POST['Order_ID'])) {
            $order_id = $conn->real_escape_string($_POST['Order_ID']);
            
            // SQL query to select order details by User_ID and Order_ID
            $sqlOrderDetails = "SELECT * FROM `OrderDetails` , `Products` WHERE `Products`.`Product_id` = `OrderDetails`.`Product_id` AND `order_ID` = '$order_id'";

            // Execute the SQL query for order details
            $result = $conn->query($sqlOrderDetails);

            if ($result) {
                $orderDetails = array();
                while ($row = $result->fetch_assoc()) {
                    $row['isFeatured'] = ($row['isFeatured'] === "1") ? true : false;
                    $row['isSale'] = ($row['isSale'] === "1") ? true : false;
                    $row['isNew'] = ($row['isNew'] === "1") ? true : false;
                    $orderDetails[] = $row;
                }
                $conn->close();
                sendResponse(true, 'Order details retrieved successfully', $orderDetails);
            } else {
                $conn->close();
                sendResponse(false, 'Error executing the SQL query for order details', $conn->error);
            }
        } else {
            // SQL query to select orders by User_ID
            $sqlOrders = "SELECT * FROM Orders WHERE User_ID = '$user_id'";

            // Execute the SQL query for orders
            $result = $conn->query($sqlOrders);

            if ($result) {
                $orders = array();
                while ($row = $result->fetch_assoc()) {
                    $orders[] = $row;
                }
                $conn->close();
                sendResponse(true, 'Orders retrieved successfully', $orders);
            } else {
                $conn->close();
                sendResponse(false, 'Error executing the SQL query for orders', $conn->error);
            }
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide User_ID.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}