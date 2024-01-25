<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = $_POST['name'];
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $number = $_POST['number'];
    $message = $_POST['message'];

    // Email to send to
    $to = 'youssefmbadreldin@gmail.com';

    // Email Subject
    $subject = 'New message from your website';

    // Email Body
    $body = "You have received a new message from your contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email\n\nNumber: $number\n\nMessage:\n$message";

    // Headers
    $headers = "From: ".$email;

    // Send Email
    if($email) {
        mail($to,$subject,$body,$headers);
        echo "Thank you for contacting us. We will get back to you as soon as possible.";
    } else {
        echo "Please enter a valid email address.";
    }
}
?>
