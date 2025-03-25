<?php

$server = "localhost";
$user = "u517997350_checkaic_";
$password = "Paradox@122";
$db = "u517997350_Elite";

$conn = mysqli_connect($server,$user,$password,$db);

if(!$conn) {
    die("Connection Failed:".mysqli_connect_error());
}

?>