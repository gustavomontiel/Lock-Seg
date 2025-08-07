<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordReset extends Mailable
{
    use Queueable, SerializesModels;

    private $user;
    private $token;

    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    public function build()
    {
        return $this
            ->subject(trans('messages.password_reset_subject'))
            ->view('emails.password-reset')
            ->with([
                'name' => $this->user->nombre ?? $this->user->name,
                'token' => $this->token,
            ]);
    }
}
