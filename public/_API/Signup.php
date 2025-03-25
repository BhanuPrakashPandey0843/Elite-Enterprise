<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

    // Return the results as JSON
    header('Content-Type: application/json');
    // Set the Access-Control-Allow-Origin header to allow requests from any origin
    header("Access-Control-Allow-Origin: *");
    
    // Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
    header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
    
    // Set the Access-Control-Allow-Headers header to allow the specified headers
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

// Check if a POST request with username and password is received
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'], $_POST['email'], $_POST['phone'])) {
    // Sanitize and prepare the input data
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);
    $email = $conn->real_escape_string($_POST['email']);
    $phoneNumber = $conn->real_escape_string($_POST['phone']);

    // Check if the username already exists in the database
    $checkUsernameQuery = "SELECT * FROM Login WHERE username = '$username'";
    $checkUsernameResult = $conn->query($checkUsernameQuery);

    if ($checkUsernameResult->num_rows > 0) {
        // Username already exists, return an error message
        echo json_encode(array('status' => false, 'message' => 'Username already exists'));
    } else {
        // Check if the email already exists in the UserDetails table
        $checkEmailQuery = "SELECT * FROM UserDetails WHERE Email = '$email'";
        $checkEmailResult = $conn->query($checkEmailQuery);

        if ($checkEmailResult->num_rows > 0) {
            // Email already exists, return an error message
            echo json_encode(array('status' => false, 'message' => 'Email already exists'));
        } else {
            // Check if the phone number already exists in the UserDetails table
            $checkPhoneQuery = "SELECT * FROM UserDetails WHERE PhoneNumber = '$phoneNumber'";
            $checkPhoneResult = $conn->query($checkPhoneQuery);

            if ($checkPhoneResult->num_rows > 0) {
                // Phone number already exists, return an error message
                echo json_encode(array('status' => false, 'message' => 'Phone number already exists'));
            } else {
                // SQL query to insert the user into the Login table
                $insertLoginQuery = "INSERT INTO Login (username, password) VALUES ('$username', '$password')";

                // Execute the query
                if ($conn->query($insertLoginQuery) === TRUE) {
                    // Registration in Login table successful

                    // Retrieve the generated User_ID
                    $user_id = $conn->insert_id;

                    // Now, insert user details into UserDetails table
                    // SQL query to insert user details into UserDetails table
                    $insertUserDetailsQuery = "INSERT INTO UserDetails (User_ID, Email, PhoneNumber) VALUES ('$user_id', '$email', '$phoneNumber')";

                    // Execute the query
                    if ($conn->query($insertUserDetailsQuery) === TRUE) {
                        // User details insertion successful
                        echo json_encode(array('status' => true, 'message' => 'Registration successful'));
                    } else {
                        // User details insertion failed
                        echo json_encode(array('status' => false, 'message' => 'Error: ' . $conn->error));
                    }
                } else {
                    // Registration in Login table failed
                    echo json_encode(array('status' => false, 'message' => 'Error: ' . $conn->error));
                }
            }
        }
    }
} else {
    // Missing required data
    echo json_encode(array('status' => false, 'message' => 'Missing username, password, email, or phone'));

 }
?>