package com.bernardoms.productapi.controller;

import com.bernardoms.productapi.exception.UserNotAuthorizeException;
import com.bernardoms.productapi.model.User;
import com.bernardoms.productapi.service.JwtTokenService;
import com.bernardoms.productapi.service.UserService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RequestMapping("/v1/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtTokenService jwtTokenService;

    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> createUser(@RequestBody User user, UriComponentsBuilder uriComponentsBuilder) throws Exception {
        var savedUser = userService.saveUser(user);
        var uriComponent = uriComponentsBuilder.path("/v1/users/{username}").buildAndExpand(savedUser);
        return ResponseEntity.created(uriComponent.toUri()).build();
    }

    @PostMapping
    @RequestMapping("/auth")
    @CrossOrigin(origins = "*")
    public String authenticateUser(@RequestBody User user) throws UserNotAuthorizeException {
        return userService.authenticateUser(user);
    }

    @PostMapping
    @RequestMapping("/token/validate")
    @CrossOrigin(origins = "*")
    public void validateToken(@RequestHeader String token) throws UserNotAuthorizeException {
        if (!jwtTokenService.validateToken(token)) {
            throw new JwtException("Invalid or Expired Token");
        }
    }
}
