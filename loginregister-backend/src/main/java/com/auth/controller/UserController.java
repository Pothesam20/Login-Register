package com.auth.controller;

import com.auth.dto.UserProfileDTO;
import com.auth.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(Authentication authentication) {
        String username = authentication.getName();
        UserProfileDTO profile = userService.getUserProfile(username);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            Authentication authentication,
            @Valid @RequestBody UserProfileDTO profileDTO) {
        String username = authentication.getName();
        UserProfileDTO updatedProfile = userService.updateUserProfile(username, profileDTO);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }
}
