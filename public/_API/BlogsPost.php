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
    // Ensure that the necessary POST parameters are provided
        // Handle the image upload and get the unique filename
    $uploadDir = 'Blogs_images/'; // Store images in _API/Brands_images/
    $filename = time() . '_' . basename($_FILES['img']['name']);
    $targetFilePath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['img']['tmp_name'], $targetFilePath)) {
        $date = $_POST['date'];
        $cname = $_POST['cname'];
        $caption1 = $_POST['caption1'];
        $caption2 = $_POST['caption2'];
        $img = 'https://theeliteenterprise.in/_API/' . $targetFilePath;

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed', $conn->connect_error);
        }

        // Sanitize the inputs
        $date = $conn->real_escape_string($date);
        $cname = $conn->real_escape_string($cname);
        $caption1 = $conn->real_escape_string($caption1);
        $caption2 = $conn->real_escape_string($caption2);
        $img = $conn->real_escape_string($img);

        // SQL query to insert a new record into the "Blogs" table
        $sqlInsertBlog = "INSERT INTO Blogs (date, cname, caption1, caption2, img) 
                          VALUES ('$date', '$cname', '$caption1', '$caption2', '$img')";

        // Execute the SQL query for inserting a new blog
        if ($conn->query($sqlInsertBlog)) {
            $conn->close();
            sendResponse(true, 'Blog inserted successfully');
        } else {
            $conn->close();
            sendResponse(false, 'Error executing the SQL query', $conn->error);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide date, cname, caption1, caption2, and img.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}