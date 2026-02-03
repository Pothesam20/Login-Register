package com.auth.service;

import com.auth.dto.*;
import com.auth.exception.BadRequestException;
import com.auth.exception.ResourceNotFoundException;
import com.auth.model.User;
import com.auth.repository.UserRepository;
import com.auth.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, 
                      JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        // Validate input
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists");
        }

        // Validate password requirements
        validatePassword(request.getPassword());

        // Parse date
        LocalDate dateOfBirth = LocalDate.parse(request.getDateOfBirth());

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDateOfBirth(dateOfBirth);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFavoriteColor(request.getFavoriteColor());
        user.setNickName(request.getNickName());
        user.setPetName(request.getPetName());
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Generate JWT token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        String token = tokenProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setType("Bearer");
        response.setId(savedUser.getId());
        response.setUsername(savedUser.getUsername());
        response.setPhoneNumber(savedUser.getPhoneNumber());
        response.setDateOfBirth(savedUser.getDateOfBirth().toString());
        response.setMessage("User registered successfully");
        return response;
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", request.getUsername()));

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setType("Bearer");
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setDateOfBirth(user.getDateOfBirth().toString());
        response.setMessage("Login successful");
        return response;
    }

    public AuthResponse forgotPassword(ForgotPasswordRequest request) {
        // Validate input
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        // Validate password requirements
        validatePassword(request.getNewPassword());

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", request.getUsername()));

        // Verify security answers
        if (!user.getPhoneNumber().equals(request.getPhoneNumber())) {
            throw new BadRequestException("Phone number does not match");
        }
        if (!user.getFavoriteColor().equalsIgnoreCase(request.getFavoriteColor())) {
            throw new BadRequestException("Security answer (favorite color) does not match");
        }
        if (!user.getNickName().equalsIgnoreCase(request.getNickName())) {
            throw new BadRequestException("Security answer (nick name) does not match");
        }
        if (!user.getPetName().equalsIgnoreCase(request.getPetName())) {
            throw new BadRequestException("Security answer (pet name) does not match");
        }

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setMessage("Password reset successfully");
        return response;
    }

    public AuthResponse changePassword(String username, ChangePasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        validatePassword(request.getNewPassword());

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setMessage("Password changed successfully");
        return response;
    }

    private void validatePassword(String password) {
        if (password.length() < 5 || password.length() > 12) {
            throw new BadRequestException("Password must be between 5 and 12 characters");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new BadRequestException("Password must contain at least one uppercase letter");
        }
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            throw new BadRequestException("Password must contain at least one special character");
        }
    }
}
