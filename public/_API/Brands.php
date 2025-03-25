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
    
// SQL query to select Brand_id, Brand_Name, and hasSubcat from the Brands table
$sqlBrands = "SELECT * FROM Brands ORDER BY `sequence` ASC";

// Execute the query
$resultBrands = $conn->query($sqlBrands);

if ($resultBrands) {
    $brands = array();

    // Fetch the results and store them in an array
    while ($rowBrands = $resultBrands->fetch_assoc()) {
        $brandData = array(
            'Brand_id' => $rowBrands['Brand_id'],
            'Brand_Name' => $rowBrands['Brand_Name'],
            'hasSubcat' => $rowBrands['hasSubcat'] === '1', // Convert to boolean
            'isPartner' => $rowBrands['isPartner'] === '1', // Convert to boolean
            'Brand_image' => $rowBrands['Brand_image']
        );

        // Check if hasSubcat is true for this brand
        if ($rowBrands['hasSubcat']) {
            // SQL query to select all data from Brands_Subcat for this brand
            $brandId = $rowBrands['Brand_id'];
            $sqlSubcat = "SELECT * FROM Brands_Subcat WHERE ConnectedToBrand_id = '$brandId'";

            // Execute the subcat query
            $resultSubcat = $conn->query($sqlSubcat);

            if ($resultSubcat) {
                $subcatData = array();

                // Fetch the subcat results and store them in an array
                while ($rowSubcat = $resultSubcat->fetch_assoc()) {
                    $subcatData[] = $rowSubcat;
                }

                // Add the subcat data to the brand data
                $brandData['subcategories'] = $subcatData;
            }
        }

        // Add the brand data to the brands array
        $brands[] = $brandData;
    }

    // Return the results as JSON
    echo json_encode(array('status' => true, 'brands' => $brands));
} else {
    // Error in executing the brands query
    echo json_encode(array('status' => false, 'message' => 'Error: ' . $conn->error));
}

// Close the database connection
$conn->close();
?>