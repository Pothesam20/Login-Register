package com.userprofile.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_PROFILE")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_profile_seq")
    @SequenceGenerator(name = "user_profile_seq", sequenceName = "USER_PROFILE_SEQ", allocationSize = 1)
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "FULL_NAME", nullable = false, length = 100)
    private String fullName;

    @Column(name = "ROLE", length = 50)
    private String role;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "LOCATION", length = 100)
    private String location;

    @Column(name = "WEBSITE", length = 200)
    private String website;

    @Column(name = "BIO", length = 500)
    private String bio;

    @Column(name = "PROFILE_IMAGE", length = 500)
    private String profileImage;

    @Column(name = "COVER_IMAGE", length = 500)
    private String coverImage;

    @CreationTimestamp
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "userProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserStats userStats;

    public UserProfile() {}

    public UserProfile(Long userId, String fullName, String role, String email, String location, 
                      String website, String bio, String profileImage, String coverImage, 
                      LocalDateTime createdAt, UserStats userStats) {
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
        this.userStats = userStats;
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

    public UserStats getUserStats() { return userStats; }
    public void setUserStats(UserStats userStats) { this.userStats = userStats; }
}
