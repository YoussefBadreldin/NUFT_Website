<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
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
    mail($to,$subject,$body,$headers);
    echo "Thank you for contacting us. We will get back to you as soon as possible.";
}
?>
