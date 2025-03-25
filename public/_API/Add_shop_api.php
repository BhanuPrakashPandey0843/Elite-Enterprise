<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if a POST request with product data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['Product_name'], $_POST['Product_originalPrice'], $_POST['Product_offerPrice'], $_POST['isFeatured'], $_POST['isSale'], $_POST['isNew'], $_POST['ConnectedToBrand_id'], $_POST['ConnectedToSubBrand_id'])) {
    // Sanitize and prepare the input data
    $product_name = $conn->real_escape_string($_POST['Product_name']);
    $product_Description = $conn->real_escape_string($_POST['Product_Description']);
    $product_Description_long = $conn->real_escape_string($_POST['Product_Description_long']);
    $product_originalPrice = $conn->real_escape_string($_POST['Product_originalPrice']);
    $product_offerPrice = $conn->real_escape_string($_POST['Product_offerPrice']);
    $stock = $conn->real_escape_string($_POST['stock']);
    $stock_below = $conn->real_escape_string($_POST['stock_below']);
    $isFeatured = $conn->real_escape_string($_POST['isFeatured']);
    $isSale = $conn->real_escape_string($_POST['isSale']);
    $isNew = $conn->real_escape_string($_POST['isNew']);
    $ConnectedToBrand_id = $conn->real_escape_string($_POST['ConnectedToBrand_id']);
    $ConnectedToSubBrand_id = $conn->real_escape_string($_POST['ConnectedToSubBrand_id']);

    // Handle the image upload and get the unique filenames
    $uploadDir = 'Products_images/'; // Store images in _API/Products_images/

    // Initialize variables for image URLs
    $image_urls = array();

    // Upload up to 4 images based on user's choice
    for ($i = 1; $i <= 4; $i++) {
        $image_key = 'Product_img' . $i;
        if (isset($_FILES[$image_key]) && !empty($_FILES[$image_key]['name'])) {
            $image = time() . "_$i_" . basename($_FILES[$image_key]['name']);
            if (move_uploaded_file($_FILES[$image_key]['tmp_name'], $uploadDir . $image)) {
                $image_urls[] = 'https://theeliteenterprise.in/_API/' . $uploadDir . $image;
            } else {
                echo json_encode(array('Status' => false, 'message' => "Error uploading $image_key"));
                exit;
            }
        } else {
            // If an image is not provided, add null to the image URLs
            $image_urls[] = null;
        }
    }

    // Prepare the image URLs for database insertion
    $image_columns = array('Product_img', 'Product_img2', 'Product_img3', 'Product_img4');

    // New SQL query to insert the product data into Products
    $sql = "INSERT INTO Products (Product_id, Product_name, Product_originalPrice, Product_offerPrice, 
            " . implode(', ', $image_columns) . ", isFeatured, isSale, isNew, 
            ConnectedToBrand_id, ConnectedToSubBrand_id, Product_desc, Product_desc_long, Stock, Alert_Stock_Below) 
            VALUES (NULL, '$product_name', '$product_originalPrice', '$product_offerPrice', 
            '" . implode("', '", $image_urls) . "', $isFeatured, $isSale, $isNew, 
            $ConnectedToBrand_id, $ConnectedToSubBrand_id, '$product_Description', '$product_Description_long', '$stock', '$stock_below')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        // Insertion successful
        echo json_encode(array('Status' => true, 'message' => 'Product inserted successfully'));
    } else {
        // Insertion failed
        echo json_encode(array('Status' => false, 'message' => 'Error: ' . $conn->error));
    }
} else {
    // Missing required data
    echo json_encode(array('Status' => false, 'message' => 'Missing product data'));
}
?>