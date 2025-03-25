<?php
// Include the database configuration file
require_once 'config.php'; // Adjust the path as needed

// Check if a POST request with image data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the necessary data (e.g., image file, caption, content) is provided
    if (isset($_FILES['image'], $_POST['caption'], $_POST['content'])) {
        // Handle the image upload and get the unique filename
        $uploadDir = 'Home_Below_Slider_Images/'; // Store images in _API/Home_Below_Slider_Images/
        $filename = time() . '_' . basename($_FILES['image']['name']);
        $targetFilePath = $uploadDir . $filename;

        // Move the uploaded image to the desired directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            // Image upload was successful; now insert the data into the database
            $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

            // Check the connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Sanitize and prepare the data for insertion
            $caption = $conn->real_escape_string($_POST['caption']);
            $content = $conn->real_escape_string($_POST['content']);
            $url = 'https://paradox122.000webhostapp.com/_API/' . $uploadDir . $filename;

            // SQL query to insert the data into Home_Below_Slider_Images
            $sql = "INSERT INTO Home_Below_Slider_Images (url, caption, content) VALUES ('$url', '$caption', '$content')";

            // Execute the query
            if ($conn->query($sql) === TRUE) {
                // Insertion successful
                echo json_encode(array('message' => 'Record inserted successfully'));
            } else {
                // Insertion failed
                echo json_encode(array('message' => 'Error: ' . $conn->error));
            }

            // Close the database connection
            $conn->close();
        } else {
            // Image upload failed
            echo json_encode(array('message' => 'Error uploading image'));
        }
    } else {
        // Missing required data
        echo json_encode(array('message' => 'Missing required data'));
    }
} else {
    // Invalid request method
    echo json_encode(array('message' => 'Invalid request method'));
}
?>
