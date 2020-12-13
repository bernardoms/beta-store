package com.bernardoms.productapi.controller;

import com.bernardoms.productapi.exception.UserNotFoundException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.net.BindException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler({BindException.class, HttpMessageNotReadableException.class})
    private ResponseEntity<Object> handleIllegalArgumentException(Exception ex, HttpServletRequest request) {
        log.error("invalid arguments/body for processing the request: " + request.getRequestURI(), ex);
        return new ResponseEntity<>(mountError(ex), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UserNotFoundException.class})
    private ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, HttpServletRequest request) {
        log.info("user not found! : " + request.getRequestURI(), ex);
        return new ResponseEntity<>(mountError(ex), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({Exception.class})
    private ResponseEntity<Object> handleException(Exception ex, HttpServletRequest request) {
        log.error("error on process the request: " + request.getRequestURI(), ex);
        return new ResponseEntity<>(mountError(ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({JwtException.class})
    private ResponseEntity<Object> handleUnauthorizedException(Exception ex, HttpServletRequest request) {
        log.info("unauthorized error");
        return new ResponseEntity<>(mountError(ex), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> details = new HashMap<>();

        var errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(field -> details.put(field.getField(), field.getDefaultMessage()));

        errors.put("description", details);

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    private HashMap<Object, Object> mountError(Exception e) {
        var error = new HashMap<>();
        error.put("description", e.getMessage());
        return error;
    }
}