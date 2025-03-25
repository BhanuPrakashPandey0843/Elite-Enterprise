<?php

// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    $response = array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error);
    echo json_encode($response);
    exit;
}

// Function to handle adding a new banner image
function addBannerImage($conn, $caption, $content, $imagePath)
{
    $sql = "INSERT INTO Home_Slider_Images (caption, content, url) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        return array('status' => false, 'message' => 'Database error: ' . $conn->error);
    }

    $stmt->bind_param('sss', $caption, $content, $imagePath);

    if ($stmt->execute()) {
        return array('status' => true, 'message' => 'BannerImage added successfully');
    } else {
        return array('status' => false, 'message' => 'Error adding BannerImage: ' . $stmt->error);
    }
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the necessary form fields are set
    if (isset($_POST['Caption']) && isset($_POST['Content']) && isset($_FILES['Image'])) {
        $caption = $_POST['Caption'];
        $content = $_POST['Content'];

        // File upload handling
        $targetDir = '../_API/Home_Slider_Images/'; // Set your upload directory
        $imageName = basename($_FILES['Image']['name']);
        $targetPath = $targetDir . $imageName;

        // Check if the file is an image
        $imageFileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
        if (getimagesize($_FILES['Image']['tmp_name'])) {
            if (move_uploaded_file($_FILES['Image']['tmp_name'], $targetPath)) {
                // Database insertion
                $result = addBannerImage($conn, $caption, $content, $targetPath);
                echo json_encode($result);
            } else {
                echo json_encode(array('status' => false, 'message' => 'Error uploading file'));
            }
        } else {
            echo json_encode(array('status' => false, 'message' => 'Invalid image file'));
        }
    } else {
        echo json_encode(array('status' => false, 'message' => 'Missing form fields'));
    }
} else {
    echo json_encode(array('status' => false, 'message' => 'Invalid request method'));
}

// Close the database connection
$conn->close();
?>