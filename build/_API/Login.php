<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('message' => 'Connection failed', 'error' => $conn->connect_error));
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
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    // Sanitize and prepare the input data
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);

    // SQL query to select user from Login table
    $sql = "SELECT `User_ID` FROM Login WHERE username = '$username' AND password = '$password'";

    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // Login successful
        $user = $result->fetch_assoc();
        echo json_encode(array('message' => 'Login successful', 'user' => $user));
    } else {
        // Login failed
        echo json_encode(array('message' => 'Login failed'));
    }
} else {
    // Missing required data
    echo json_encode(array('message' => 'Missing username or password'));
}
?>
