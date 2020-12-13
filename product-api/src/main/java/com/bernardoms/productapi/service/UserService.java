package com.bernardoms.productapi.service;

import com.bernardoms.productapi.exception.UserNotAuthorizeException;
import com.bernardoms.productapi.model.User;
import com.bernardoms.productapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;

    public String saveUser(User user) throws Exception {
        var optionalUser = userRepository.findByUsername(user.getUsername());

        if(optionalUser.isPresent()) {
            throw new Exception();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user).getUsername();
    }

    public String authenticateUser(User user) throws UserNotAuthorizeException {

        User foundUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new UserNotAuthorizeException(user.getUsername()));

        if(!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            throw new UserNotAuthorizeException(foundUser.getUsername());
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        return jwtTokenService.generateToken(authentication, foundUser.getRole());
    }
}
