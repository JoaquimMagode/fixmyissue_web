<?php
if ($_POST) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $address = $_POST['address'];
    $description = $_POST['description'];
    
    $to = "joaquimcesarmagode@gmail.com";
    $subject = "New Service Appointment Request - Fix My Issue";
    
    $message = "New service appointment request:\n\n";
    $message .= "Name: " . $name . "\n";
    $message .= "Phone: " . $phone . "\n";
    $message .= "Service: " . $service . "\n";
    $message .= "Address: " . $address . "\n";
    $message .= "Problem Description: " . $description . "\n";
    $message .= "\nSubmitted on: " . date('Y-m-d H:i:s');
    
    $headers = "From: noreply@fixmyissue.com\r\n";
    $headers .= "Reply-To: " . $phone . "\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>