package com.userprofile.service;

import com.userprofile.dto.*;
import com.userprofile.entity.UserPost;
import com.userprofile.entity.UserProfile;
import com.userprofile.entity.UserStats;
import com.userprofile.repository.UserPostRepository;
import com.userprofile.repository.UserProfileRepository;
import com.userprofile.repository.UserStatsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    private static final Logger log = LoggerFactory.getLogger(UserProfileService.class);

    private final UserProfileRepository userProfileRepository;
    private final UserStatsRepository userStatsRepository;
    private final UserPostRepository userPostRepository;

    public UserProfileService(UserProfileRepository userProfileRepository,
                             UserStatsRepository userStatsRepository,
                             UserPostRepository userPostRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userStatsRepository = userStatsRepository;
        this.userPostRepository = userPostRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileDTO getUserProfile(Long userId) {
        log.info("Fetching user profile for userId: {}", userId);
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return mapToProfileDTO(userProfile);
    }

    @Transactional(readOnly = true)
    public UserStatsDTO getUserStats(Long userId) {
        log.info("Fetching user stats for userId: {}", userId);
        UserStats userStats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User stats not found for userId: " + userId));
        return mapToStatsDTO(userStats);
    }

    @Transactional(readOnly = true)
    public UserDashboardDTO getUserDashboard(Long userId) {
        log.info("Fetching user dashboard for userId: {}", userId);
        UserProfileDTO profile = getUserProfile(userId);
        UserStatsDTO stats = getUserStats(userId);
        return new UserDashboardDTO(profile, stats);
    }

    @Transactional
    public UserProfileDTO updateUserProfile(Long userId, UpdateProfileRequest request) {
        log.info("Updating user profile for userId: {}", userId);
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        userProfile.setFullName(request.getFullName());
        userProfile.setRole(request.getRole());
        userProfile.setLocation(request.getLocation());
        userProfile.setWebsite(request.getWebsite());
        userProfile.setBio(request.getBio());

        UserProfile updatedProfile = userProfileRepository.save(userProfile);
        log.info("User profile updated successfully for userId: {}", userId);
        return mapToProfileDTO(updatedProfile);
    }

    @Transactional
    public UserPostDTO createPost(Long userId, CreatePostRequest request) {
        log.info("Creating post for userId: {}", userId);
        
        // Verify user exists
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        UserPost post = new UserPost();
        post.setUserId(userId);
        post.setContent(request.getContent());
        post.setPostType(request.getPostType());

        UserPost savedPost = userPostRepository.save(post);

        // Update post count in stats
        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User stats not found for userId: " + userId));
        stats.setPosts(stats.getPosts() + 1);
        userStatsRepository.save(stats);

        log.info("Post created successfully with postId: {}", savedPost.getPostId());
        return mapToPostDTO(savedPost, userProfile.getFullName());
    }

    @Transactional(readOnly = true)
    public List<UserPostDTO> getUserPosts(Long userId) {
        log.info("Fetching posts for userId: {}", userId);
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        List<UserPost> posts = userPostRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return posts.stream()
                .map(post -> mapToPostDTO(post, userProfile.getFullName()))
                .collect(Collectors.toList());
    }

    // Mapping methods
    private UserProfileDTO mapToProfileDTO(UserProfile userProfile) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setUserId(userProfile.getUserId());
        dto.setFullName(userProfile.getFullName());
        dto.setRole(userProfile.getRole());
        dto.setEmail(userProfile.getEmail());
        dto.setLocation(userProfile.getLocation());
        dto.setWebsite(userProfile.getWebsite());
        dto.setBio(userProfile.getBio());
        dto.setProfileImage(userProfile.getProfileImage());
        dto.setCoverImage(userProfile.getCoverImage());
        dto.setCreatedAt(userProfile.getCreatedAt());
        return dto;
    }

    private UserStatsDTO mapToStatsDTO(UserStats userStats) {
        UserStatsDTO dto = new UserStatsDTO();
        dto.setUserId(userStats.getUserId());
        dto.setPosts(userStats.getPosts());
        dto.setFollowers(userStats.getFollowers());
        dto.setFollowing(userStats.getFollowing());
        return dto;
    }

    private UserPostDTO mapToPostDTO(UserPost post, String userName) {
        UserPostDTO dto = new UserPostDTO();
        dto.setPostId(post.getPostId());
        dto.setUserId(post.getUserId());
        dto.setContent(post.getContent());
        dto.setPostType(post.getPostType());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUserName(userName);
        return dto;
    }
}
