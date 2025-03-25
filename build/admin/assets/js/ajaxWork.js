


function showCustomers(){
    $.ajax({
        url:"./adminView/viewCustomers.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showProducts(){
    $.ajax({
        url:"./adminView/viewProducts.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showBrands(){
    $.ajax({
        url:"./adminView/viewBrands.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showSubBrands(){
    $.ajax({
        url:"./adminView/viewBrandsSubcat.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
              // Reinitialize Bootstrap components and event listeners
            initializeBootstrap();
        }
    });
}

function showOrders(){
    $.ajax({
        url:"./adminView/viewOrders.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
             // Reinitialize Bootstrap components and event listeners
            initializeBootstrap();
        }
    });
}

function showCopuns(){
    $.ajax({
        url:"./adminView/viewCopuns.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showAvalableZipCodes(){
    $.ajax({
        url:"./adminView/viewZipCodes.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showAvalableBanners(){
    $.ajax({
        url:"./adminView/viewBanners.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}
function showBlogs(){
    $.ajax({
        url:"./adminView/viewBlog.php",
        method:'POST',
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

//delete product data
function itemDelete(id){
    var confirmation = confirm('Are you sure you want to delete this item?');
    if(confirmation)
    {
        $.ajax({
        url:"./controller/deleteItemController.php",
        type: 'POST',
        data:{record:id},
        success:function(data){
            alert('Items Successfully deleted');
            showProducts();
        }
    });
    }
}

// Function to initialize Bootstrap components and event listeners
function initializeBootstrap() {
    // Reinitialize Bootstrap components and event listeners here
    // Example: Reinitialize dropdowns
    $('.dropdown-toggle').dropdown();
    $('#addSubBrandstModal').modal('hide'); // Close the modal

    // You can add more reinitialization logic for other Bootstrap components if needed
}


