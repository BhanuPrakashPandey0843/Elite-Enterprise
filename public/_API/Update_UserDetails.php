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
    if (isset($_POST['UserID'], $_POST['Email'], $_POST['PhoneNumber'], $_POST['Username'], $_POST['Password'])) {
        $user_id = $_POST['UserID'];
        $email = $_POST['Email'];
        $phone_number = $_POST['PhoneNumber'];
        $username = $_POST['Username'];
        $password = $_POST['Password'];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the inputs
        $user_id = $conn->real_escape_string($user_id);
        $email = $conn->real_escape_string($email);
        $phone_number = $conn->real_escape_string($phone_number);
        $username = $conn->real_escape_string($username);
        $password = $conn->real_escape_string($password);

        // SQL query to select the existing Email
        $sqlSelectExisting = "SELECT Email, PhoneNumber, username, password FROM UserDetails
                              JOIN Login ON UserDetails.User_ID = Login.User_ID
                              WHERE UserDetails.User_ID = $user_id";
        $result = $conn->query($sqlSelectExisting);

        if ($result) {
            $existingData = $result->fetch_assoc();

            if ($existingData) {
                // Check if the new values are different from the existing ones
                $updateDetails = [];
                // Convert both email values to strings and check if they are different
                if (strval($email) !== strval($existingData['Email'])) {
                    $updateDetails[] = "UserDetails.Email = '$email'";
                }
        
                // Convert other values to strings and check for differences
                if (strval($phone_number) !== strval($existingData['PhoneNumber'])) {
                    $updateDetails[] = "UserDetails.PhoneNumber = '$phone_number'";
                }

                if ($username !== $existingData['username']) {
                    $updateDetails[] = "Login.username = '$username'";
                }
                if ($password !== $existingData['password']) {
                    $updateDetails[] = "Login.password = '$password'";
                }

                // Check if there are updates to perform
                if (!empty($updateDetails)) {
                    // Construct the SQL query for updates
                    $sqlUpdate = "UPDATE UserDetails
                                  JOIN Login ON UserDetails.User_ID = Login.User_ID
                                  SET " . implode(', ', $updateDetails) . "
                                  WHERE UserDetails.User_ID = $user_id";

                    // Execute the SQL query
                    if ($conn->query($sqlUpdate)) {
                        $conn->close();
                        sendResponse(true, 'Data updated successfully');
                    } else {
                        sendResponse(false, 'Error executing the SQL query', $conn->error);
                    }
                } else {
                    // No updates were necessary
                    $conn->close();
                    sendResponse(true, 'No data changes detected. Nothing to update.');
                }
            } else {
                sendResponse(false, 'No data found for the specified User_ID');
            }
        } else {
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide UserID, Email, PhoneNumber, Username, and Password.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}