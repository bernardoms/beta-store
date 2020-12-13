package com.bernardoms.productapi.exception;

public class UserNotAuthorizeException extends Exception {
    public UserNotAuthorizeException(String userName) {
        super("User with name " + userName + " not authorize!, invalid username or password");
    }
}
