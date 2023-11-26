package com.ReactSpring.controller;

import com.ReactSpring.dto.AuthCredentialsRequest;

import com.ReactSpring.dto.UserDTO;
import com.ReactSpring.entity.Authority;
import com.ReactSpring.entity.AuthorityEnum;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.AuthorityRepository;
import com.ReactSpring.repository.UserRepository;
import com.ReactSpring.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository authorityRepository;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest req){
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    req.getUsername(), req.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            // Assuming jwtUtil is an instance of a class with the method validateToken
            Boolean isTokenValid = jwtUtil.validateToken(token, user);
            return ResponseEntity.ok(isTokenValid);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        // Check if the username already exists
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // If the username doesn't exist, create a new user
        User user = new User();
        user.setUsername(userDTO.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(hashedPassword);
        user.setEmail(userDTO.getEmail());
        user.setCohortStartDay(LocalDate.now());

        userRepository.save(user); // Save the user first to generate the user ID

        Authority authority = new Authority();
        authority.setAuthority(AuthorityEnum.ROLE_USER.name());
        authority.setUser(user); // Set the user for the authority
        authorityRepository.save(authority); // Save the authority with the associated user

        return ResponseEntity.ok("User registered successfully!");
    }

}
