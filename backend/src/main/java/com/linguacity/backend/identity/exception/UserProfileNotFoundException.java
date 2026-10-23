package com.linguacity.backend.identity.exception;

public class UserProfileNotFoundException extends RuntimeException {

    public UserProfileNotFoundException() {
        super("User profile not found");
    }
}
