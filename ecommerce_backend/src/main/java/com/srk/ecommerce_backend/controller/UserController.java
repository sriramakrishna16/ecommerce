package com.srk.ecommerce_backend.controller;


import com.srk.ecommerce_backend.dto.UserProfileUpdateDto;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.service.JwtService;
import com.srk.ecommerce_backend.service.UserService;
import com.srk.ecommerce_backend.dto.UserProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService service;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public Users register(@RequestBody Users user){
        return service.saveUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            throw new BadCredentialsException("Invalid Username or Password");
    }

    @GetMapping("/profile")
    public UserProfileDto getProfile(Authentication authentication){
        String username = authentication.getName();
        return service.getDetails(username);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<String> updateProfile(Authentication authentication, @RequestBody UserProfileUpdateDto dto) throws Exception {
        String username = authentication.getName();
        service.updateProfile(username,dto);
        return ResponseEntity.ok("Update Request Successful");
    }
}
