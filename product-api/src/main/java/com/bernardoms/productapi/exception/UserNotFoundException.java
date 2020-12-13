package com.bernardoms.productapi.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String userName) {
        super("User with name " + userName + " not found!");
    }
}
