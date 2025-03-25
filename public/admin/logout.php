<?php
// Start the session (if it's not already started)
session_start();

// Check if the user is logged in
if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true){
    // If the user is logged in, set 'logged_in' to false to log them out
    $_SESSION['logged_in'] = false;
    
    // You can also destroy the entire session to log the user out completely
    session_destroy();
     header("Location: login.php");
}
?>