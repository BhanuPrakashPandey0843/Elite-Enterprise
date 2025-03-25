
<body>
    <div >
    <style>
    .table-image {
    max-width: 50px; /* Adjust the width as needed */
    max-height: 50px; /* Adjust the height as needed */
    transition: max-width 0.5s ease-in-out, max-height 0.5s ease-in-out; /* Transition properties */
   }
    .table-image:hover {
    max-width: 150px; /* Adjust the width as needed */
    max-height: 150px; /* Adjust the height as needed */
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
    .modal {
    z-index: 9999; /* Adjust this value as needed */
}
    
    </style>
     <h2 class="h2">All Products</h2>
       <button id="addProductBtn" data-toggle="modal" data-target="#addProductModal" class="btn btn-primary">Add Product</button>
       <div class="form-group">
        <input type="text" class="form-control" id="searchProduct" placeholder="Search Product">
       </div>
  <table class="table" id="productTable">
    <thead>
      <tr>
        <th class="text-center">S.N.</th>
        <th class="text-center">Product Name</th>
        <th class="text-center">Product Original Price</th>
        <th class="text-center">Product Offer Price</th>
        <th class="text-center">Product Img</th>
        <th class="text-center">Featured</th>
        <th class="text-center">Sale</th>
        <th class="text-center">New</th>
        <th class="text-center">Action</th>
      </tr>
    </thead>
        <?php
    include_once "../config/dbconnect.php";
    $sql = "SELECT * FROM `Products` ORDER BY `Product_id` DESC ";
    $result = $conn->query($sql);
    $count = 1;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $productid = $row["Product_id"];
    ?>
            <tr>
                <td><?= $count ?></td>
                <td><?= $row["Product_name"] ?></td>
                <td><?= $row["Product_originalPrice"] ?></td>
                <td><?= $row["Product_offerPrice"] ?></td>
                <td><img class="table-image" src="<?= $row["Product_img"] ?>"></td>
                <td><?= $row["isFeatured"] ? 'Yes' : 'No' ?></td>
                <td><?= $row["isSale"] ? 'Yes' : 'No' ?></td>
                <td><?= $row["isNew"] ? 'Yes' : 'No' ?></td>
                <td>
                    <a class="btn btn-sm btn-warning" href="adminView/edit_product.php?Product_id=<?= $productid ?>">Modify</a>
                    <button class="btn btn-sm btn-danger" onclick="itemDelete(<?= $productid ?>)">Delete</button>
                </td>
            </tr>
    <?php
            $count = $count + 1;
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
    <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                    <style>
                        /* Overall container style */
                        .editor-container {
                            font-family: Arial, sans-serif;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            padding: 10px;
                            margin-bottom: 20px;
                        }
                
                        /* Button style */
                        .editor-container button {
                            background-color: #f8f9fa;
                            border: 1px solid #dee2e6;
                            color: #495057;
                            padding: 8px 12px;
                            margin-right: 5px;
                            border-radius: 4px;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }
                
                        /* Button hover style */
                        .editor-container button:hover {
                            background-color: #e9ecef;
                        }
                
                        /* Editor style */
                        .editor {
                            border: 1px solid #ced4da;
                            border-radius: 5px;
                            padding: 10px;
                            min-height: 200px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                    </style>
                <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a product -->
                <form id="addProductForm">
                    <!-- Add input fields for product details here -->
                    <div class="form-group">
                        <label for="productName">Product Name</label>
                        <input type="text" class="form-control" id="productName" name="Product_name" data-validetta="required">
                    </div>
                    <div class="form-group">
                        <label for="productName">Product Short Description</label>
                        <input type="text" class="form-control" id="productDescription" name="Product_Description" data-validetta="required">
                    </div>
                    <div class="form-group">
                        <label for="productName">Product Long Description</label>
                        <div class="editor-container">
                            <button onclick="formatText('bold')"><i class="fas fa-bold"></i></button>
                            <button onclick="formatText('italic')"><i class="fas fa-italic"></i></button>
                            <button onclick="formatText('underline')"><i class="fas fa-underline"></i></button>
                            <button onclick="formatText('strikethrough')"><i class="fas fa-strikethrough"></i></button>
                            <button onclick="formatText('justifyLeft')"><i class="fas fa-align-left"></i></button>
                            <button onclick="formatText('justifyCenter')"><i class="fas fa-align-center"></i></button>
                            <button onclick="formatText('justifyRight')"><i class="fas fa-align-right"></i></button>
                            <button onclick="formatText('justifyFull')"><i class="fas fa-align-justify"></i></button>
                            <button onclick="formatText('insertOrderedList')"><i class="fas fa-list-ol"></i></button>
                            <button onclick="formatText('insertUnorderedList')"><i class="fas fa-list-ul"></i></button>
                            <button onclick="formatText('indent')"><i class="fas fa-indent"></i></button>
                            <button onclick="formatText('outdent')"><i class="fas fa-outdent"></i></button>
                        </div>

                        <div class="editor" id="productLongDescription" name="Product_Description_long" contenteditable="true" data-validetta="required" onfocus="clearPlaceholder()">This Product Contains....</div>
                    </div>

                    <div class="form-group">
                        <label for="originalPrice">Original Price</label>
                        <input type="number" class="form-control" id="originalPrice" name="Product_originalPrice" data-validetta="required,number">
                    </div>
                    <div class="form-group">
                        <label for="offerPrice">Offer Price</label>
                        <input type="number" class="form-control" id="offerPrice" name="Product_offerPrice">
                    </div>
                    <div class="form-group">
                        <label for="stock">Stock Available</label>
                        <input type="number" class="form-control" id="stock" name="stock">
                    </div>
                    <div class="form-group">
                        <label for="stock_below">Stock Alert Below</label>
                        <input type="number" class="form-control" id="stock_below" name="stock_below">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="isFeatured" name="isFeatured" value="1">
                        <label class="form-check-label" for="isFeatured">Featured</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="isSale" name="isSale" value="1">
                        <label class="form-check-label" for="isSale">Sale</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="isNew" name="isNew" value="1">
                        <label class="form-check-label" for="isNew">New</label>
                    </div>
                    <!-- Add more input fields for other product details here -->
                    <div class="form-group">
                        <label for="brandSelect">Brand</label>
                        <select class="form-control" id="brandSelect" name="ConnectedToBrand_id">
                            <!-- Options will be populated using JavaScript -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label id='subBrandSelectLabel' for="subBrandSelect">Subbrand</label>
                        <select class="form-control" id="subBrandSelect" name="ConnectedToSubBrand_id">
                            <!-- Options will be populated using JavaScript -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="productImage">Product Image</label>
                        <input type="file" class="form-control-file" id="productImage" name="Product_img1" accept      ="image/*" data-validetta="required">
                    </div>
                    <div class="form-group">
                        <label for="productImage2">Product Image 2</label>
                        <input type="file" class="form-control-file" id="productImage2" name="Product_img2" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label for="productImage3">Product Image 3</label>
                        <input type="file" class="form-control-file" id="productImage3" name="Product_img3" accept="image/*">
                    </div>
                    <!-- Display the chosen image in a 50px size -->
                    <div id="imagePreview">
                        <img id="selectedImage" src="#" alt="Selected Image" style="max-width: 150px; max-height: 150px;       display: none; padding:5px; margin:10px;">
                    </div>
                    <div id="imagePreview2" class="image-preview">
                        <img id="selectedImage2" src="#" alt="Selected Image" style="max-width: 150px; max-height: 150px; display: none; padding: 5px; margin: 10px;">
                    </div>
                    <div id="imagePreview3" class="image-preview">
                        <img id="selectedImage3" src="#" alt="Selected Image" style="max-width: 150px; max-height: 150px; display: none; padding: 5px; margin: 10px;">
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </div>
</div>

    <!-- Modal for editing products -->
    <div class="modal fade" id="editProductModal" tabindex="-1" role="dialog" aria-labelledby="editProductModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProductModalLabel">Edit Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for editing a product -->
                <form id="editProductForm">
                    <input type="hidden" id="editProductId" name="Product_id">
                    <div class="form-group">
                        <label for="editProductName">Product Name</label>
                        <input type="text" class="form-control" id="editProductName" name="Product_name" data-validetta="required">
                    </div>
                    <div class="form-group">
                        <label for="editProductDescription">Product Short Description</label>
                        <input type="text" class="form-control" id="editProductDescription" name="Product_Description" data-validetta="required">
                    </div>
                    <div class="form-group">
                        <label for="editProductLongDescription">Product Long Description</label>
                        <div class="editor-container">
                            <button onclick="formatText('bold')"><i class="fas fa-bold"></i></button>
                            <button onclick="formatText('italic')"><i class="fas fa-italic"></i></button>
                            <button onclick="formatText('underline')"><i class="fas fa-underline"></i></button>
                            <button onclick="formatText('strikethrough')"><i class="fas fa-strikethrough"></i></button>
                            <button onclick="formatText('justifyLeft')"><i class="fas fa-align-left"></i></button>
                            <button onclick="formatText('justifyCenter')"><i class="fas fa-align-center"></i></button>
                            <button onclick="formatText('justifyRight')"><i class="fas fa-align-right"></i></button>
                            <button onclick="formatText('justifyFull')"><i class="fas fa-align-justify"></i></button>
                            <button onclick="formatText('insertOrderedList')"><i class="fas fa-list-ol"></i></button>
                            <button onclick="formatText('insertUnorderedList')"><i class="fas fa-list-ul"></i></button>
                            <button onclick="formatText('indent')"><i class="fas fa-indent"></i></button>
                            <button onclick="formatText('outdent')"><i class="fas fa-outdent"></i></button>
                        </div>
                        <div class="editor" id="editProductLongDescription" name="Product_Description_long" contenteditable="true"></div>
                    </div>
                    <div class="form-group">
                        <label for="editOriginalPrice">Original Price</label>
                        <input type="number" class="form-control" id="editOriginalPrice" name="Product_originalPrice" data-validetta="required,number">
                    </div>
                    <div class="form-group">
                        <label for="editOfferPrice">Offer Price</label>
                        <input type="number" class="form-control" id="editOfferPrice" name="Product_offerPrice">
                    </div>
                    <div class="form-group">
                        <label for="editStock">Stock Available</label>
                        <input type="number" class="form-control" id="editStock" name="stock">
                    </div>
                    <div class="form-group">
                        <label for="editStockBelow">Stock Alert Below</label>
                        <input type="number" class="form-control" id="editStockBelow" name="stock_below">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="editIsFeatured" name="isFeatured" value="1">
                        <label class="form-check-label" for="editIsFeatured">Featured</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="editIsSale" name="isSale" value="1">
                        <label class="form-check-label" for="editIsSale">Sale</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="editIsNew" name="isNew" value="1">
                        <label class="form-check-label" for="editIsNew">New</label>
                    </div>
                    <!-- Add more input fields for other product details here -->
                    <div class="form-group">
                        <label for="editBrandSelect">Brand</label>
                        <select class="form-control" id="editBrandSelect" name="ConnectedToBrand_id">
                            <!-- Options will be populated using JavaScript -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label id='editSubBrandSelectLabel' for="editSubBrandSelect">Subbrand</label>
                        <select class="form-control" id="editSubBrandSelect" name="ConnectedToSubBrand_id">
                            <!-- Options will be populated using JavaScript -->
                        </select>
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</div>


    <!-- Include Validetta -->
    <script src="https://cdn.jsdelivr.net/npm/validetta/src/validetta.min.js"></script>

<script>

$(document).ready(function($) {
    
    // Populate the Brand dropdown
    $.ajax({ 
        url: '../_API/Brands.php', // Replace with your PHP endpoint to fetch brands
        type: 'GET',
        dataType: 'json', // Specify JSON data type
        success: function(response) {
            if (response.status === true) {
                var brands = response.brands;
                var brandSelect = $('#brandSelect');
                
                // Clear existing options
                brandSelect.empty();
                
                // Add default option
                brandSelect.append($('<option>', {
                    value: '',
                    text: 'Select a Brand'
                }));
                
                // Loop through brands and add them as options
                $.each(brands, function(index, brand) {
                    brandSelect.append($('<option>', {
                        value: brand.Brand_id,
                        text: brand.Brand_Name
                    }));
                });
            } else {
                // Handle error or display a message
                console.error('Error fetching brands.');
            }
        },
        error: function() {
            // Handle error or display a message
            console.error('Error fetching brands.');
        }
    });

    // Handle the change event of the Brand dropdown to populate the Subbrand dropdown
    // Handle the change event of the Brand dropdown to populate the Subbrand dropdown
$('#brandSelect').change(function() {
    var brandId = $(this).val();
    
    // Make an AJAX POST request to get_subbrands.php
    $.ajax({
        url: '../_API/get_subbrands.php',
        type: 'POST',
        data: { brandId: brandId },
        dataType: 'json', // Specify JSON data type
        success: function(response) {
            // Clear existing options in the Subbrand dropdown
            var subBrandSelect = $('#subBrandSelect');
            subBrandSelect.empty();
            
            // Determine if the brand has subbrands
            if (response.length > 0) {
                // Brand has subbrands, change label to mandatory
                $('#subBrandSelectLabel').text('Subbrand');
            } else {
                // Brand has no subbrands, keep label as optional
                $('#subBrandSelectLabel').text('Subbrand (Not Required)');
            }
            
            // Add a default option
            subBrandSelect.append($('<option>', {
                value: '',
                text: 'Select a Subbrand'
            }));
            
            // Loop through the received subbrands and add them as options
            $.each(response, function(index, subbrand) {
                subBrandSelect.append($('<option>', {
                    value: subbrand.Subcat_id,
                    text: subbrand.Subcat_Name
                }));
            });
        },
        error: function() {
            // Handle error or display a message
            console.error('Error fetching subbrands.');
        }
    });
});


    // Handle the form submission


            // Handle the form submission
            $('#addProductForm').submit(function(e) {
                e.preventDefault();

                // Check if brand with subbrands is selected
                var brandId = $('#brandSelect').val();
                var subBrandId = $('#subBrandSelect').val();

                // if (brandId && $('#subBrandSelect').length && !subBrandId) {
                //     alert('Please select a subbrand.');
                //     return;
                // }

                // Check if all fields are filled
                var requiredFields = ['productName', 'productDescription', 'originalPrice', 'offerPrice', 'brandSelect'];
                for (var i = 0; i < requiredFields.length; i++) {
                    var fieldId = requiredFields[i];
                    if (!$('#' + fieldId).val()) {
                        alert('Please fill all required fields.');
                        return;
                    }
                }

                // Get the product long description
                var productLongDescription = $('#productLongDescription').html();

                var formData = new FormData(this);
                formData.append('Product_Description_long', productLongDescription);

                // Set the value to "0" for unchecked checkboxes
                formData.set('isFeatured', formData.get('isFeatured') || '0');
                formData.set('isSale', formData.get('isSale') || '0');
                formData.set('isNew', formData.get('isNew') || '0');
                formData.set('ConnectedToSubBrand_id', formData.get('ConnectedToSubBrand_id') || '0');

                var isEditMode = $(this).data('mode') === 'edit';
                var url = isEditMode ? '../_API/Update_shop_api.php' : '../_API/Add_shop_api.php';
                var method = isEditMode ? 'PUT' : 'POST'; // Assuming you have separate APIs for adding and updating

                $('#addProductForm button[type="submit"]').prop('disabled', true);
                $.ajax({
                    url: url,
                    type: method,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        // Handle the response from the API call
                        if (response.Status == true) {
                            alert(response);
                            window.location.href = 'index.php?redirect=showProducts';
                        } else {
                            alert(response);
                            window.location.href = 'index.php?redirect=showProducts';
                        }
                        // Re-enable the "Add" button
                        $('#addProductForm button[type="submit"]').prop('disabled', false);
                    }
                });
            });
    
     // Handle image selection
    $('#productImage').on('change', function() {
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
    // Handle image selection for Product Image 2
$('#productImage2').on('change', function () {
    handleImageSelection(this, '#selectedImage2');
});

// Handle image selection for Product Image 3
$('#productImage3').on('change', function () {
    handleImageSelection(this, '#selectedImage3');
});

// Handle image selection for Product Image 4
$('#productImage4').on('change', function () {
    handleImageSelection(this, '#selectedImage4');
});


// Function to handle image selection and preview
function handleImageSelection(fileInput, previewId) {
    var selectedImage = $(previewId);
    var imagePreview = $(previewId.replace('#selected', '#image'));
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.attr('src', e.target.result);
            selectedImage.css('display', 'block'); // Display the selected image
        };

        reader.readAsDataURL(file);
    } else {
        selectedImage.css('display', 'none'); // Hide the image if no file is selected
    }
}
    
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
});

</script>
<script>
        function formatText(command) {
            event.preventDefault();
            document.execCommand(command);
        }
        function clearPlaceholder() {
        var editor = document.getElementById('productLongDescription');
            if (editor.innerHTML.trim() === 'This Product Contains....') {
                editor.innerHTML = '';
            }
        }
</script>
</body>
