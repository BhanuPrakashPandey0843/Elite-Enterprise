<?php
// Add_coupon_api.php

// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    $response = array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error);
    echo json_encode($response);
    exit;
}

// Assuming you're using POST method to submit coupon data
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve data from the form
    $ZipCode = mysqli_real_escape_string($conn, $_POST["ZipCode"]);
    $EstimatedDays = mysqli_real_escape_string($conn, $_POST["EstimatedDays"]);

    // Validate data (you might want to add more validation)
    if (empty($ZipCode) || empty($EstimatedDays)) {
        $response = array("status" => false, "message" => "ZipCode and EstimatedDays are required.");
        echo json_encode($response);
        exit;
    }

    // SQL query to insert coupon into the database
    $sql = "INSERT INTO `AvalableZipCodes` (`ZipCode`, `estimated_Days`) VALUES ('$ZipCode', '$EstimatedDays')";
    $result = $conn->query($sql);

    // Check if the query was successful
    if ($result) {
        $response = array("status" => true, "message" => "ZipCode added successfully.");
    } else {
        $response = array("status" => false, "message" => "Error adding ZipCode: " . $conn->error);
    }

    // Return JSON response
    echo json_encode($response);
} else {
    // Invalid request method
    $response = array("status" => false, "message" => "Invalid request method.");
    echo json_encode($response);
}

// Close the database connection
$conn->close();
?>