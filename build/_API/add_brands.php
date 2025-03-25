<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if a POST request with brand data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['Brand_Name'], $_FILES['Brand_image'], $_POST['isPartner'])) {
    // Sanitize and prepare the input data
    $brand_name = $conn->real_escape_string($_POST['Brand_Name']);
    $is_partner = $conn->real_escape_string($_POST['isPartner']);
    $hasSubBrand = $conn->real_escape_string($_POST['hasSubBrand']);

    // Handle the image upload and get the unique filename
    $uploadDir = 'Brand_Images/'; // Store images in _API/Brands_images/
    $filename = time() . '_' . basename($_FILES['Brand_image']['name']);
    $targetFilePath = $uploadDir . $filename;

    // Move the uploaded image to the desired directory
    if (move_uploaded_file($_FILES['Brand_image']['tmp_name'], $targetFilePath)) {
        // Image upload was successful; now insert the brand data into the database
        $url = 'https://theeliteenterprise.in/_API/' . $targetFilePath;

        // SQL query to insert the brand data into Brands
        $sql = "INSERT INTO Brands (Brand_Name, Brand_image, isPartner, hasSubcat) VALUES ('$brand_name', '$url', '$is_partner', '$hasSubBrand')";

        // Execute the query
        if ($conn->query($sql) === TRUE) {
            // Insertion successful
            echo json_encode(array('Status' => true, 'message' => 'Brand inserted successfully'));
        } else {
            // Insertion failed
            echo json_encode(array('Status' => false, 'message' => 'Error: ' . $conn->error));
        }
    } else {
        // Image upload failed
        echo json_encode(array('Status' => false, 'message' => 'Error uploading image'));
    }
} else {
    // Missing required data
    echo json_encode(array('Status' => false, 'message' => 'Missing brand data'));
}
?>