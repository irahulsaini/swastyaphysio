<?php  error_reporting(E_ALL); session_start(); date_default_timezone_set('Asia/Kolkata');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = array();

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';
require './inc/settings.php';



/*
 ******************************************
 ******** DON'T MODIFY CODE BELOW *********
 ******************************************
 */
/* Mail headers */
$mail['headers'][] = "MIME-Version: 1.0" . "\r\n";
$mail['headers'][] = "Content-type:text/html;charset=UTF-8" . "\r\n";
$mail['headers'][] = "From: ".$mail['from_name']." <".$mail['from_mail'].">"."\r\n";
$mail['headers'] = join('',$mail['headers']);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $field = array();
	foreach($_POST as $key => $value){
		$key = htmlentities(trim(utf8_encode($key)));
		$value = htmlentities(trim(utf8_encode($value)));
		$field[$key] = $value;
	}
    $response = [];
    if(!$field['name']){
        $response = [
            'status'    => false,
            'message'   => "Name is Required"
        ];
        exit(json_encode($response));
    }
    
    if(!$field['phone']){
        $response = [
            'status'    => false,
            'message'   => "Phone is Required"
        ];
        exit(json_encode($response));
    }

    $status = send_mail($field);
    if($status == true){
        
        $response = [
            'status' => true
        ];
        
    }else{
        $response = [
            'status' => false,
            'message' => $status
        ];
    }
    exit(json_encode($response));
}
function send_mail($fields){
    
    global $mail;
    $m = '<html><head><title>'.$mail['subject'].'</title></head><body><table>';
    if(is_array($fields) && count($fields) > 0){
        foreach($fields as $key => $value){
            if(!$value){
                continue;
            }
            $m .= '
            <tr>
                <th align="left">'.ucwords(str_replace(array('-','-'),' ',$key)).'</th>
                <th>:</th>
                <td>'.nl2br($value).'</td>
            </tr>
            ';
        }
    }
	$m .= '</table></body></html>';
	$mail['message'] = str_replace('{fields}',$m,$mail['message']);
	$to = explode(",",$mail['to']);
	$status = 0;
	foreach($to as $_to){
	    
		$_to = strtolower($_to);
		if(!filter_var($_to,FILTER_VALIDATE_EMAIL)){
			continue;
		}

        $mailer = new PHPMailer(true);
try {
    // Server settings
    // $mailer->isSMTP(); // ✅ enable SMTP properly
    $mailer->Host       = $mail['smtp_host'];
    // $mailer->SMTPAuth   = true;
    $mailer->Username   = $mail['smtp_username'];
    $mailer->Password   = $mail['smtp_password'];
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or ENCRYPTION_SMTPS depending on port
    $mailer->Port       = $mail['smtp_port'];

    // Recipients
    $mailer->setFrom($mail['from_mail'], $mail['from_name']);
    foreach (explode(',', $mail['to']) as $item) {
        $mailer->addAddress(trim($item));
    }

    // Content
    $mailer->isHTML(true);
    $mailer->Subject = $mail['subject'];
    $mailer->Body    = $mail['message'];

    if ($mailer->send()) {
        $status = 1;
    }
} catch (Exception $e) {
    $status = "Message could not be sent. Mailer Error: {$mailer->ErrorInfo}";
}

	}
	return $status;
}