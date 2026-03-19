package com.iatracker.controller;

import com.iatracker.dto.*;
import com.iatracker.model.User;
import com.iatracker.repository.UserRepository;
import com.iatracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.existsByUsername(req.getUsername()))
            return ResponseEntity.badRequest().body("Username already exists");
        if (userRepo.existsByEmail(req.getEmail()))
            return ResponseEntity.badRequest().body("Email already exists");

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        return userRepo.findByUsername(req.getUsername())
            .filter(u -> passwordEncoder.matches(req.getPassword(), u.getPassword()))
            .map(u -> ResponseEntity.ok(new AuthResponse(jwtUtil.generate(u.getUsername()), u.getUsername())))
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
