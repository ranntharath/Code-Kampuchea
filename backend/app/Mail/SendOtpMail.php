<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;

class SendOtpMail extends Mailable
{
    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your OTP Code'
        );
    }

public function content(): Content
{
    return new Content(
        htmlString: "<p>Your OTP is: <strong>{$this->otp}</strong></p>" 
    );
}
}
