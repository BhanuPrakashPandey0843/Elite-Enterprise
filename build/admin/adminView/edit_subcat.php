<?php
include_once "../config/dbconnect.php";

if (isset($_GET['Subcat_id'])) {
    $subcat_id = $_GET['Subcat_id'];

    // Fetch Subcategory details from the database
    function fetchSubcategory($conn, $subcat_id) {
        $sql = "SELECT `Subcat_id`, `Subcat_Name`, `ConnectedToBrand_id` 
                FROM `Brands_Subcat` WHERE `Subcat_id` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $subcat_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    // Fetch Brands to populate the dropdown
    function fetchBrands($conn) {
        $sql = "SELECT `Brand_id`, `Brand_Name` FROM `Brands`";
        return $conn->query($sql);
    }

    $subcategory = fetchSubcategory($conn, $subcat_id);
    $brands = fetchBrands($conn);

    if (!$subcategory) {
        echo "Subcategory not found!";
        exit();
    }
} else {
    echo "Subcategory ID not provided!";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update Subcategory information
    $subcat_name = $_POST['subcat_name'];
    $connectedToBrand_id = $_POST['connectedToBrand_id'];

    $sql_update = "UPDATE `Brands_Subcat` 
                   SET `Subcat_Name` = ?, `ConnectedToBrand_id` = ? 
                   WHERE `Subcat_id` = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("sii", $subcat_name, $connectedToBrand_id, $subcat_id);
    
    if ($stmt_update->execute()) {
        // Redirect to the desired URL (e.g., view_subcat.php) after successful update
        header("Location: /admin");
        exit(); // Terminate script after redirect to prevent further code execution
    } else {
        echo "Error updating subcategory!";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Subcategory</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background-color: white;
            padding: 20px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input, 
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            background-color: #00CEEE;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #009ab8;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Edit Subcategory</h2>
    <form action="" method="POST">
        <div class="form-group">
            <label for="subcat_name">Subcategory Name:</label>
            <input type="text" name="subcat_name" id="subcat_name" value="<?php echo $subcategory['Subcat_Name']; ?>" required>
        </div>

        <div class="form-group">
            <label for="connectedToBrand_id">Connected To Brand:</label>
            <select name="connectedToBrand_id" id="connectedToBrand_id" required>
                <option value="">Select Brand</option>
                <?php while ($brand = $brands->fetch_assoc()): ?>
                    <option value="<?php echo $brand['Brand_id']; ?>" <?php if ($subcategory['ConnectedToBrand_id'] == $brand['Brand_id']) echo "selected"; ?>>
                        <?php echo $brand['Brand_Name']; ?>
                    </option>
                <?php endwhile; ?>
            </select>
        </div>

        <button type="submit">Update Subcategory</button>
    </form>
</div>

</body>
</html>