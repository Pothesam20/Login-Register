package com.userprofile.controller;

import com.userprofile.dto.*;
import com.userprofile.service.UserProfileService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserProfileController {

    private static final Logger log = LoggerFactory.getLogger(UserProfileController.class);

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Get user profile by userId
     * GET /api/users/{userId}/profile
     */
    @GetMapping("/{userId}/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        log.info("REST request to get user profile for userId: {}", userId);
        try {
            UserProfileDTO profile = userProfileService.getUserProfile(userId);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            log.error("Error fetching user profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Get user statistics by userId
     * GET /api/users/{userId}/stats
     */
    @GetMapping("/{userId}/stats")
    public ResponseEntity<UserStatsDTO> getUserStats(@PathVariable Long userId) {
        log.info("REST request to get user stats for userId: {}", userId);
        try {
            UserStatsDTO stats = userProfileService.getUserStats(userId);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            log.error("Error fetching user stats: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Get complete user dashboard (profile + stats)
     * GET /api/users/{userId}/dashboard
     */
    @GetMapping("/{userId}/dashboard")
    public ResponseEntity<UserDashboardDTO> getUserDashboard(@PathVariable Long userId) {
        log.info("REST request to get user dashboard for userId: {}", userId);
        try {
            UserDashboardDTO dashboard = userProfileService.getUserDashboard(userId);
            return ResponseEntity.ok(dashboard);
        } catch (RuntimeException e) {
            log.error("Error fetching user dashboard: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Update user profile
     * PUT /api/users/{userId}/profile
     */
    @PutMapping("/{userId}/profile")
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateProfileRequest request) {
        log.info("REST request to update user profile for userId: {}", userId);
        try {
            UserProfileDTO updatedProfile = userProfileService.updateUserProfile(userId, request);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            log.error("Error updating user profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Create a new post
     * POST /api/users/{userId}/posts
     */
    @PostMapping("/{userId}/posts")
    public ResponseEntity<UserPostDTO> createPost(
            @PathVariable Long userId,
            @Valid @RequestBody CreatePostRequest request) {
        log.info("REST request to create post for userId: {}", userId);
        try {
            UserPostDTO post = userProfileService.createPost(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(post);
        } catch (RuntimeException e) {
            log.error("Error creating post: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get all posts for a user
     * GET /api/users/{userId}/posts
     */
    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<UserPostDTO>> getUserPosts(@PathVariable Long userId) {
        log.info("REST request to get posts for userId: {}", userId);
        try {
            List<UserPostDTO> posts = userProfileService.getUserPosts(userId);
            return ResponseEntity.ok(posts);
        } catch (RuntimeException e) {
            log.error("Error fetching user posts: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
