package com.invitations.exception;

public class UserIsNotEnabledException extends RuntimeException {
    public UserIsNotEnabledException() {
    }

    public UserIsNotEnabledException(String message) {
        super(message);
    }

    public UserIsNotEnabledException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserIsNotEnabledException(Throwable cause) {
        super(cause);
    }
}
