<?php 

/*
 *
 * Example Template for Form Submission
 *
 */

$error = 0;

if(
    $_POST['first_name'] == "" &&
    $_POST['last_name'] == "" &&
    $_POST['email'] == "" &&
    $_POST['phone'] == "" &&
    $_POST["car_choice"] == ""
) {
    $error = 1;
}

if($error == 1) { die(); }

/****************************************
	Database Connection
****************************************/
$host="localhost";
$uname="root";
$pass="root";
$database = "form_submissions";
$connection=mysqli_connect($host,$uname,$pass,$database);


/****************************************
	Functions
****************************************/	
function stripper($res){
	$clear = trim(preg_replace('/ +/', ' ', preg_replace('/[^A-Za-z0-9 ]/', ' ', urldecode(html_entity_decode(strip_tags($res))))));
	return $clear;
}

    
define('KB', 1024);
define('MB', 1048576);
define('GB', 1073741824);
define('TB', 1099511627776);

$_POST["first_name"] = stripper($_POST["first_name"]);
$_POST["last_name"] = stripper($_POST["last_name"]);
$_POST["email"] = trim(strip_tags($_POST["email"], FILTER_SANITIZE_EMAIL));
$_POST["phone"] = stripper($_POST["phone"]);
$_POST["car_choice"] = stripper($_POST["car_choice"]);
$_POST["message"] = stripper($_POST["message"]);


if(!isset($_POST["first_name"])){$_POST["first_name"]=NULL;}
if(!isset($_POST["last_name"])){$_POST["last_name"]=NULL;}
if(!isset($_POST["email"])){$_POST["email"]=NULL;}
if(!isset($_POST["phone"])){$_POST["phone"]=NULL;}
if(!isset($_POST["car_choice"])){$_POST["car_choice"]=NULL;}
if(!isset($_POST["message"])){$_POST["message"]=NULL;}


$insertQ = "INSERT INTO `form_submissions`.`form_script_v1` (`id`, `fname`, `lname`, `email`, `phone`, `select_choice`, `message`, `terms`, `time_stamp`) VALUES (NULL, '".$_POST["first_name"]."', '".$_POST["last_name"]."', '".$_POST["email"]."', '".$_POST["phone"]."', '".$_POST["car_choice"]."', '".$_POST["message"]."', '".$_POST["terms"]."', '".$_POST["post_timestamp"]."'); ";
echo $insertQ;
mysqli_query($connection, $insertQ);