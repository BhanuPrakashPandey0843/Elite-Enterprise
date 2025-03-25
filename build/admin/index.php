<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // If the user is not logged in, redirect them to login.php
    header("Location: login.php");
    exit;
}

// Function to redirect based on the query parameter
function redirectTo($redirect) {
    switch ($redirect) {
        case 'showCustomers':
            echo '<script>showCustomers();</script>';
            break;
        case 'showProducts':
            echo '<script>showProducts();</script>';
            break;
        case 'showBrands':
            echo '<script>showBrands();</script>';
            break;
        case 'showSubBrands':
            echo '<script>showSubBrands();</script>';
            break;
        case 'showOrders':
            echo '<script>showOrders();</script>';
            break;
        case 'showCopuns':
            echo '<script>showCopuns();</script>';
            break;
        case 'showAvalableZipCodes':
            echo '<script>showAvalableZipCodes();</script>';
            break;
        case 'showAvalableBanners':
            echo '<script>showAvalableBanners();</script>';
            break;
        case 'showBlogs':
            echo '<script>showBlogs();</script>';
            break;
        // Add more cases for other functions as needed
        default:
            // If unknown value is provided, redirect to a default page or handle accordingly
            header("Location: default.php");
            exit;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="./assets/css/style.css">
  <script src="https://kit.fontawesome.com/d46cfb21c0.js" crossorigin="anonymous"></script>
  <script type="text/javascript" src="./assets/js/ajaxWork.js?v=<?php echo time(); ?>"></script>
  <script type="text/javascript" src="./assets/js/script.js?v=<?php echo time(); ?>"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
  <style>
    .card {
      background-color: #3B3131;
      color: #fff;
      text-align: center;
      padding: 20px;
      cursor: pointer;
      height: 200px;
    }

    .card:hover {
      background-color: #5a5a5a;
      filter: drop-shadow(10px 5px 4px #5a5a5a);
    }

    .card i {
      font-size: 70px;
    }

    .card h4 {
      margin-top: 20px;
      font-size: 20px;
    }

    .card h5 {
      margin-top: 10px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  
<?php
    include "./adminHeader.php";
    include "./sidebar.php";
   
    include_once "./config/dbconnect.php";
?>

<div id="main-content" class="container allContent-section py-4">
    <div class="row">
        
        <div class="col-sm-4" onclick="showCustomers()">
           <div class="card">
             <i class="fa fa-users mb-2"></i>
             <h4>Total Users</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_users FROM `UserDetails`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_users'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         
         <div class="col-sm-4" onclick="showProducts()">
           <div class="card">
             <i class="fa-solid fa-bag-shopping"></i>
             <h4>Total Products</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_Products FROM `Products`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_Products'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         
         
         <div class="col-sm-4" onclick="showBrands()">
           <div class="card">
             <i class="fa-solid fa-cube"></i>
             <h4>Total Brands</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_Brands FROM `Brands`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_Brands'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         
         <div class="col-sm-4" onclick="showSubBrands()">
           <div class="card">
             <i class="fa-solid fa-cube"></i>
             <h4>Brands Subcat</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_SubBrands FROM `Brands_Subcat`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_SubBrands'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         
         <div class="col-sm-4" onclick="showOrders()">
           <div class="card">
             <i class="fa-solid fa-receipt"></i>
             <h4>Total Orders</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_Orders FROM `Orders`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_Orders'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         <div class="col-sm-4" onclick="showCopuns()">
           <div class="card">
             <i class="fa-solid fa-hand-holding-dollar"></i>
             <h4>Total Coupons</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS total_Copuns FROM `Copuns`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['total_Copuns'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         <div class="col-sm-4" onclick="showAvalableZipCodes()">
           <div class="card">
             <i class="fa-solid fa-location-dot"></i>
             <h4>Total Avalable ZipCodes</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS AvalableZipCodes FROM `AvalableZipCodes`";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['AvalableZipCodes'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         <div class="col-sm-4" onclick="showAvalableBanners()">
           <div class="card">
             <i class="fa-solid fa-ticket"></i>
             <h4>Total Banners</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS AvalableBanners FROM `Home_Slider_Images` ";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['AvalableBanners'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
         <div class="col-sm-4" onclick="showBlogs()">
           <div class="card">
             <i class="fa-solid fa-ticket"></i>
             <h4>Total Blogs</h4>
             <h5>
               <?php
                 $sql = "SELECT COUNT(*) AS Blogs FROM `Blogs` ";
                 $result = $conn->query($sql);
                 if ($result && $result->num_rows > 0) {
                   $row = $result->fetch_assoc();
                   $count = $row['Blogs'];
                   echo $count;
                 } else {
                   echo "0";
                 }
               ?>
             </h5>
           </div>
         </div>
         
    </div>
</div>

<?php
    if (isset($_GET['category']) && $_GET['category'] == "success") {
        echo '<script> alert("Category Successfully Added")</script>';
    } else if (isset($_GET['category']) && $_GET['category'] == "error") {
        echo '<script> alert("Adding Unsuccess")</script>';
    }
    if (isset($_GET['size']) && $_GET['size'] == "success") {
        echo '<script> alert("Size Successfully Added")</script>';
    } else if (isset($_GET['size']) && $_GET['size'] == "error") {
        echo '<script> alert("Adding Unsuccess")</script>';
    }
    if (isset($_GET['variation']) && $_GET['variation'] == "success") {
        echo '<script> alert("Variation Successfully Added")</script>';
    } else if (isset($_GET['variation']) && $_GET['variation'] == "error") {
        echo '<script> alert("Adding Unsuccess")</script>';
    }
?>

<script>
// Get the query parameter value
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect');

// Call the redirect function with the provided query parameter value
if (redirect) {
    redirectTo(redirect);
}

// Function to call the corresponding JavaScript function based on the query parameter
function redirectTo(redirect) {
    switch (redirect) {
        case 'showCustomers':
            showCustomers();
            break;
        case 'showProducts':
            showProducts();
            break;
        case 'showBrands':
            showBrands();
            break;
        case 'showSubBrands':
            showSubBrands();
            break;
        case 'showOrders':
            showOrders();
            break;
        case 'showCopuns':
            showCopuns();
            break;
        case 'showAvalableZipCodes':
            showAvalableZipCodes();
            break;
        case 'showAvalableBanners':
            showAvalableBanners();
            break;
        case 'showBlogs':
            showBlogs();
            break;
        // Add more cases for other functions as needed
        default:
            // If unknown value is provided, handle accordingly
            console.log("Invalid function specified.");
    }
}
</script>

</body>
</html>
