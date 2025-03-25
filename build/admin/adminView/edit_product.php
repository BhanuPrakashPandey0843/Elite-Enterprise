<?php
include_once "../config/dbconnect.php";

if (isset($_GET['Product_id'])) {
    $product_id = $_GET['Product_id'];

    function fetchProduct($conn, $product_id) {
        $sql = "SELECT `Product_id`, `Product_name`, `Product_originalPrice`, `Product_offerPrice`, `Product_img`, `Product_img2`, `Product_img3`, `Product_img4`, `isFeatured`, `isSale`, `isNew`, `ConnectedToBrand_id`, `ConnectedToSubBrand_id`, `Product_desc`, `Product_desc_long`, `Stock`, `Alert_Stock_Below` 
                FROM `Products` WHERE `Product_id` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $product_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    $product = fetchProduct($conn, $product_id);

    if (!$product) {
        echo "Product not found!";
        exit();
    }
} else {
    echo "Product ID not provided!";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update product information
    $name = $_POST['product_name'];
    $originalPrice = $_POST['product_originalPrice'];
    $offerPrice = $_POST['product_offerPrice'];
    $stock = $_POST['stock'];
    $alertStock = $_POST['alert_stock'];
    $isFeatured = isset($_POST['isFeatured']) ? 1 : 0;
    $isSale = isset($_POST['isSale']) ? 1 : 0;
    $isNew = isset($_POST['isNew']) ? 1 : 0;
    $desc = $_POST['product_desc'];
    $descLong = $_POST['product_desc_long'];

    $sql_update = "UPDATE `Products` 
                   SET `Product_name` = ?, `Product_originalPrice` = ?, `Product_offerPrice` = ?, `Stock` = ?, `Alert_Stock_Below` = ?, `isFeatured` = ?, `isSale` = ?, `isNew` = ?, `Product_desc` = ?, `Product_desc_long` = ? 
                   WHERE `Product_id` = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("ssdiisiissi", $name, $originalPrice, $offerPrice, $stock, $alertStock, $isFeatured, $isSale, $isNew, $desc, $descLong, $product_id);
    
    if ($stmt_update->execute()) {
        // Refetch the updated product details from the database
        $product = fetchProduct($conn, $product_id);
        header("Location: /admin");
    } else {
        echo "Error updating product!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
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
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-group input[type="checkbox"] {
            width: auto;
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
    <h2>Edit Product</h2>
    <form action="" method="POST">
        <div class="form-group">
            <label for="product_name">Product Name:</label>
            <input type="text" name="product_name" id="product_name" value="<?php echo $product['Product_name']; ?>" required>
        </div>

        <div class="form-group">
            <label for="product_originalPrice">Original Price:</label>
            <input type="number" name="product_originalPrice" id="product_originalPrice" value="<?php echo $product['Product_originalPrice']; ?>" required>
        </div>

        <div class="form-group">
            <label for="product_offerPrice">Offer Price:</label>
            <input type="number" name="product_offerPrice" id="product_offerPrice" value="<?php echo $product['Product_offerPrice']; ?>" required>
        </div>

        <div class="form-group">
            <label for="stock">Stock:</label>
            <input type="number" name="stock" id="stock" value="<?php echo $product['Stock']; ?>" required>
        </div>

        <div class="form-group">
            <label for="alert_stock">Alert Stock Below:</label>
            <input type="number" name="alert_stock" id="alert_stock" value="<?php echo $product['Alert_Stock_Below']; ?>" required>
        </div>

        <div class="form-group">
            <label for="product_desc">Product Description:</label>
            <textarea name="product_desc" id="product_desc" required><?php echo $product['Product_desc']; ?></textarea>
        </div>

        <div class="form-group">
            <label for="isFeatured">Is Featured:</label>
            <input type="checkbox" name="isFeatured" id="isFeatured" <?php if($product['isFeatured']) echo "checked"; ?>>
        </div>

        <div class="form-group">
            <label for="isSale">Is on Sale:</label>
            <input type="checkbox" name="isSale" id="isSale" <?php if($product['isSale']) echo "checked"; ?>>
        </div>

        <div class="form-group">
            <label for="isNew">Is New:</label>
            <input type="checkbox" name="isNew" id="isNew" <?php if($product['isNew']) echo "checked"; ?>>
        </div>

        <button type="submit">Update Product</button>
    </form>
</div>

</body>
</html>