package com.invitations.exception;

public class InvitationNotFoundException extends RuntimeException {
    public InvitationNotFoundException() {
    }

    public InvitationNotFoundException(String message) {
        super(message);
    }

    public InvitationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvitationNotFoundException(Throwable cause) {
        super(cause);
    }
}
