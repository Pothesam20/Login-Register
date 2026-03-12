package com.userprofile.dto;

import java.time.LocalDateTime;

public class UserProfileDTO {
    private Long userId;
    private String fullName;
    private String role;
    private String email;
    private String location;
    private String website;
    private String bio;
    private String profileImage;
    private String coverImage;
    private LocalDateTime createdAt;

    public UserProfileDTO() {}

    public UserProfileDTO(Long userId, String fullName, String role, String email, String location,
                         String website, String bio, String profileImage, String coverImage, LocalDateTime createdAt) {
        this.userId = userId;
        this.fullName = fullName;
        this.role = role;
        this.email = email;
        this.location = location;
        this.website = website;
        this.bio = bio;
        this.profileImage = profileImage;
        this.coverImage = coverImage;
        this.createdAt = createdAt;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
