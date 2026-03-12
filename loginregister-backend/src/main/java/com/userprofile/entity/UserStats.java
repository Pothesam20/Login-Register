package com.userprofile.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "USER_STATS")
public class UserStats {

    @Id
    @Column(name = "USER_ID")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "USER_ID")
    private UserProfile userProfile;

    @Column(name = "POSTS", nullable = false)
    private Integer posts = 0;

    @Column(name = "FOLLOWERS", nullable = false)
    private Integer followers = 0;

    @Column(name = "FOLLOWING", nullable = false)
    private Integer following = 0;

    public UserStats() {}

    public UserStats(Long userId, UserProfile userProfile, Integer posts, Integer followers, Integer following) {
        this.userId = userId;
        this.userProfile = userProfile;
        this.posts = posts;
        this.followers = followers;
        this.following = following;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public UserProfile getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfile userProfile) { this.userProfile = userProfile; }

    public Integer getPosts() { return posts; }
    public void setPosts(Integer posts) { this.posts = posts; }

    public Integer getFollowers() { return followers; }
    public void setFollowers(Integer followers) { this.followers = followers; }

    public Integer getFollowing() { return following; }
    public void setFollowing(Integer following) { this.following = following; }
}
