<?php
include_once "../config/dbconnect.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['brand_id'])) {
    $brandId = $_POST['brand_id'];

    // Delete the brand from the database
    $sql = "DELETE FROM `Brands` WHERE `Brand_id` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $brandId);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
    $conn->close();
    exit;
}
?>
<head>
    
     <!-- Include Bootstrap CSS -->
  
    
</head>

<style>
    .table-image {
    max-width: 50px; /* Adjust the width as needed */
    max-height: 50px; /* Adjust the height as needed */
    transition: max-width 0.5s ease-in-out, max-height 0.5s ease-in-out; /* Transition properties */
   }
    .table-image:hover {
    max-width: 150px; /* Adjust the width as needed */
    max-height: 150px; /* Adjust the height as needed */
    filter: drop-shadow(5px 2px 1px #999999);
    }
    
    .btn-primary {
    margin-bottom:30px;
    float: right;
    padding:5px;
    background-color: rgb(203, 120, 52);
    border-color: transparent;
    }
    .h2 {
        margin-bottom:-30px;
    }
    
    /* Pagination styles */
    .pagination {
        margin-top: 20px;
    }
    .pagination-button {
        cursor: pointer;
    }
    
    .action-buttons {
        display: flex;
        justify-content: center;
    }

    .action-buttons button {
        margin: 0 5px;
    }
    
</style>
<body>
    <div>
  <h2>All Brands</h2>
  <button id="addBrandsBtn" data-toggle="modal" data-target="#addBrandstModal" class="btn btn-primary">Add Brand</button>
  <table class="table ">
    <thead>
      <tr>
        <th class="text-center">S.N.</th>
        <th class="text-center">Brand Name</th>
        <th class="text-center">Brand Image</th>
        <th class="text-center">isPartner</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <?php
      include_once "../config/dbconnect.php";
      $sql="SELECT `Brand_id`, `Brand_Name`, `hasSubcat`, `Brand_image`, `isPartner` FROM `Brands`";
      $result=$conn-> query($sql);
      $count=1;
      if ($result-> num_rows > 0){
        while ($row=$result-> fetch_assoc()) {
           
    ?>
    <tr>
      <td><?=$count?></td>
      <td><?=$row["Brand_Name"]?></td>
      <td><img class="table-image" src="<?= $row["Brand_image"] ?>"></td>
      <td><?= $row["isPartner"] ? 'Yes' : 'No' ?></td>
      <td class="action-buttons">
            <button class="btn btn-primary edit-btn" data-brand-id="<?= $row["Brand_id"] ?>">Edit</button>
            <button class="btn btn-danger delete-btn" data-brand-id="<?= $row["Brand_id"] ?>">Delete</button>
        </td>
    </tr>
    <?php
            $count=$count+1;
           
        }
    }
    ?>
  </table>
  
  <!-- Pagination controls -->
        <div class="pagination">
            <button class="btn btn-primary pagination-button" id="prevPage">Previous</button>
            <span id="currentPage">Page 1</span>
            <button class="btn btn-primary pagination-button" id="nextPage">Next</button>
        </div>
    </div>
  <!-- Modal for adding products -->
<div class="modal fade" id="addBrandstModal" tabindex="-1" role="dialog" aria-labelledby="addBrandstModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBrandstModalLabel">Add Brand</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a product -->
                <form id="addBrandsForm">
                    <div class="form-group">
                        <label for="Brand_Name">Brand Name</label>
                        <input type="text" class="form-control" id="Brand_Name" name="Brand_Name">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="isPartner" name="isPartner" value="1">
                        <label class="form-check-label" for="isPartner">Partner</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="hasSubBrand" name="hasSubBrand" value="1">
                        <label class="form-check-label" for="isPartner">has SubBrand</label>
                    </div>
                    <div class="form-group">
                        <label for="Brand_image">Brand Image</label>
                        <input type="file" class="form-control-file" id="Brand_image" name="Brand_image" accept      ="image/*">
                    </div>
                    <!-- Display the chosen image in a 50px size -->
                    <div id="imagePreview">
                        <img id="selectedImage" src="#" alt="Selected Image" style="max-width: 150px; max-height: 150px;       display: none; padding:5px; margin:10px;">
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="submit_button">Add</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal for editing brands -->
<div class="modal fade" id="editBrandModal" tabindex="-1" role="dialog" aria-labelledby="editBrandModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editBrandModalLabel">Edit Brand</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for editing a brand -->
                <form id="editBrandsForm">
                    <input type="hidden" id="editBrand_id" name="Brand_id">
                    <div class="form-group">
                        <label for="editBrand_Name">Brand Name</label>
                        <input type="text" class="form-control" id="editBrand_Name" name="Brand_Name">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="editisPartner" name="isPartner" value="1">
                        <label class="form-check-label" for="editisPartner">Partner</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="edithasSubBrand" name="hasSubBrand" value="1">
                        <label class="form-check-label" for="edithasSubBrand">Has SubBrand</label>
                    </div>
                    <div class="form-group">
                        <label for="editBrand_image">Brand Image</label>
                        <input type="file" class="form-control-file" id="editBrand_image" name="Brand_image" accept="image/*">
                    </div>
                    <!-- Display the chosen image in a 50px size -->
                    <div id="editImagePreview">
                        <img id="editSelectedImage" src="#" alt="Selected Image" style="max-width: 150px; max-height: 150px; display: none; padding:5px; margin:10px;">
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="editSubmit_button">Update</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Include jQuery and Bootstrap JS at the bottom -->
    <!--<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>-->
<script>
function hideBrandsModal() {
  $('#addBrandstModal').modal('hide');
}
hideBrandsModal();

$(document).ready(function($) {
     // Handle the search input field
    $('#searchProduct').on('keyup', function() {
        var searchText = $(this).val().toLowerCase();
        $('#productTable tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
        });
    });
 // Number of rows to display per page
    var rowsPerPage = 5;
    var currentPage = 1;

    // Function to show/hide table rows based on current page
    function updateTableDisplay() {
        var rows = $('#productTable tbody tr');
        var startIndex = (currentPage - 1) * rowsPerPage;
        var endIndex = startIndex + rowsPerPage;
        rows.hide();
        rows.slice(startIndex, endIndex).show();
        $('#currentPage').text(' Page ' + currentPage);
    }

    // Initialize table display
    updateTableDisplay();

    // Handle "Next" button click
    $('#nextPage').on('click', function() {
        var totalRows = $('#productTable tbody tr').length;
        var totalPages = Math.ceil(totalRows / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTableDisplay();
        }
    });

    // Handle "Previous" button click
    $('#prevPage').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTableDisplay();
        }
    });
    
    // Handle image selection
    $('#Brand_image').on('change', function() {
        var selectedImage = $('#selectedImage');
        var imagePreview = $('#imagePreview');
        var fileInput = this;
        
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                selectedImage.attr('src', e.target.result);
                selectedImage.css('display', 'block'); // Display the selected image
            };

            reader.readAsDataURL(fileInput.files[0]);
        } else {
            selectedImage.css('display', 'none'); // Hide the image if no file is selected
        }
    });
    
     // Handle the form submission
    document.getElementById('addBrandsForm').addEventListener('submit', function(e) {
        // Disable the submit button
        var submitButton = document.getElementById('submit_button');
        submitButton.disabled = true;
        e.preventDefault();
        var formData = new FormData(this);
        // Set the value to "0" for unchecked checkboxes
        formData.set('isPartner', formData.get('isPartner') || '0');
        formData.set('hasSubBrand', formData.get('hasSubBrand') || '0');
    
        fetch('../_API/add_brands.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the API call
            console.log(data);
            if (data.Status == true) {
                // Display a browser alert with the success message
                alert(data.message);
                window.location.href = 'index.php?redirect=showBrands';
            } else {
                alert(data.message);
                window.location.href = 'index.php?redirect=showBrands';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(data.message);
            window.location.href = 'index.php?redirect=showBrands';
        });
    });


    
     // Handle edit button click
     // Handle edit button click
$('.edit-btn').click(function() {
    var row = $(this).closest('tr'); // Get the current table row
    var brandId = $(this).data('brand-id');
    var brandName = row.find('td:nth-child(2)').text(); // Get the brand name from the second column
    var brandImage = row.find('td:nth-child(3) img').attr('src'); // Get the brand image source
    var isPartner = row.find('td:nth-child(4)').text().toLowerCase() === 'yes'; // Get the isPartner value

    // Populate the edit modal form with the fetched data
    $('#editBrandModal').modal('show');
    $('#editBrand_id').val(brandId);
    $('#editBrand_Name').val(brandName);
    $('#editisPartner').prop('checked', isPartner);
    $('#edithasSubBrand').prop('checked', row.find('td:nth-child(5)').text().toLowerCase() === 'yes'); // Get the hasSubBrand value
    $('#editSelectedImage').attr('src', brandImage).css('display', 'block');
});

// Handle image selection in the edit modal
$('#editBrand_image').on('change', function() {
    var selectedImage = $('#editSelectedImage');
    var fileInput = this;

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.attr('src', e.target.result);
            selectedImage.css('display', 'block'); // Display the selected image
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        selectedImage.css('display', 'none'); // Hide the image if no file is selected
    }
});

// Handle the edit form submission
// Handle the edit form submission
$('#editBrandsForm').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
            formData.set('isPartner', formData.get('isPartner') || '0');
        formData.set('hasSubBrand', formData.get('hasSubBrand') || '0');
    // Append the brand ID
    var brandId = $('#editBrand_id').val();
    formData.append('Brand_id', brandId);

    // Append the current image source if no new image is selected
    var newImageSelected = $('#editBrand_image')[0].files.length > 0;
    if (!newImageSelected) {
        var currentImageSrc = $('#editSelectedImage').attr('src');
        formData.append('Brand_image', currentImageSrc);
    }

    $.ajax({
        url: '../_API/edit_brand.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            var data = JSON.parse(response);
            if (data.Status === true) {
                alert(data.message);
                $('#editBrandModal').modal('hide');
                // Optionally, you can refresh the table or update the edited row
                setTimeout(function() {
                    showBrands();
                }, 1000);
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert('An error occurred while updating the brand. Please try again.');
        }
    });
});

    $('.delete-btn').click(function() {
        var brandId = $(this).data('brand-id');
        var confirmation = confirm('Are you sure you want to delete this brand?');

        if (confirmation) {
            $.ajax({
                url: 'https://theeliteenterprise.in/admin/adminView/viewBrands.php',
                method: 'POST',
                data: { brand_id: brandId },
                success: function(response) {
                    if (response === 'success') {
                        alert('Brand deleted successfully!');
                        // Optionally, you can refresh the table or remove the deleted row
                        setTimeout(function() {
                            showBrands();
                        }, 1000);
                    } else {
                        alert('Failed to delete the brand. Please try again.');
                    }
                },
                error: function() {
                    alert('An error occurred while deleting the brand. Please try again.');
                }
            });
        }
    });
    
});
</script>
</body>

