<?php
// Add_coupon_api.php

// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Assuming you're using POST method to submit coupon data
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve data from the form
    $copunCode = $_POST["CouponCode"];
    $discountPercent = $_POST["DiscountPercent"];

    // Validate data (you might want to add more validation)
    if (empty($copunCode) || empty($discountPercent)) {
        $response = array("Status" => false, "message" => "Coupon code and discount percent are required.");
        echo json_encode($response);
        exit;
    }

    // SQL query to insert coupon into the database
    $sql = "INSERT INTO `Copuns` (`CopunCode`, `DiscountPercent`) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $copunCode, $discountPercent);

    // Execute the prepared statement
    if ($stmt->execute()) {
        $response = array("Status" => true, "message" => "Coupon added successfully.");
    } else {
        $response = array("Status" => false, "message" => "Error adding coupon: " . $stmt->error);
    }

    // Close the prepared statement
    $stmt->close();

    // Close the database connection
    $conn->close();

    // Return JSON response
    echo json_encode($response);
} else {
    // Invalid request method
    $response = array("Status" => false, "message" => "Invalid request method.");
    echo json_encode($response);
}
?>