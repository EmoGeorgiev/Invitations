package com.invitations.exception;

public class StudentAlreadyHasInvitationException extends RuntimeException {
    public StudentAlreadyHasInvitationException() {
    }

    public StudentAlreadyHasInvitationException(String message) {
        super(message);
    }

    public StudentAlreadyHasInvitationException(String message, Throwable cause) {
        super(message, cause);
    }

    public StudentAlreadyHasInvitationException(Throwable cause) {
        super(cause);
    }
}
