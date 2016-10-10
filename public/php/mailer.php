<?php
require '../../php/vendor/autoload.php';

// 5 minutes execution time
set_time_limit(5 * 60);


// Run only when file is attached
if (isset($_FILES['uploaded_file']) &&
  $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK
) {
    $mail = new PHPMailer;

    $mail->isSMTP();
    $mail->Host = 'mail.nic.ru';
    $mail->Port = 25;
    $mail->SMTPAuth = true;
    $mail->Username = 'postmaster@slavich95.ru';
    $mail->Password = 'postmaster-95';
    $mail->SMTPSecure = 'tls';
    $mail->CharSet = 'utf-8';

    $mail->setFrom('postmaster@slavich95.ru', 'Mailer');
    $mail->addAddress('slavich-95@mail.ru', 'Славич-95');
    $mail->addBCC('mvc.aaa@gmail.com', 'Andrey Astashov');
    $mail->addReplyTo('postmaster@slavich95.ru', 'Славич - 95 ');
    
    $mail->AddAttachment(
      $_FILES['uploaded_file']['tmp_name'],
      $_FILES['uploaded_file']['name']
    );

    $mail->isHTML(true);

    $mail->Subject = 'Заявка на расчет';
    $mail->Body = 'Контактная информация:<br/>';
    if ($_POST['inputEmail']) {
        $mail->clearReplyTos();
        $mail->addReplyTo($_POST['inputEmail']);
        $mail->Body .= 'Адрес эл. почты: '.$_POST['inputEmail'].'<br/>';
    }
    if ($_POST['inputPhone'])
        $mail->Body .= 'Телефон: '.$_POST['inputPhone'].'<br/>';
    
    $mail->Body .= 'См. прикрепленный файл с расчетом:';

    if (!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: '.$mail->ErrorInfo;
    }
    else {
        header('Location: http://'. $_SERVER['HTTP_HOST'].'/'.$_POST['redirect_page']);
        die;
    }
}