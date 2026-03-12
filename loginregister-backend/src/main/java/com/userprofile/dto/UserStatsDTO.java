package com.userprofile.dto;

public class UserStatsDTO {
    private Long userId;
    private Integer posts;
    private Integer followers;
    private Integer following;

    public UserStatsDTO() {}

    public UserStatsDTO(Long userId, Integer posts, Integer followers, Integer following) {
        this.userId = userId;
        this.posts = posts;
        this.followers = followers;
        this.following = following;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Integer getPosts() { return posts; }
    public void setPosts(Integer posts) { this.posts = posts; }

    public Integer getFollowers() { return followers; }
    public void setFollowers(Integer followers) { this.followers = followers; }

    public Integer getFollowing() { return following; }
    public void setFollowing(Integer following) { this.following = following; }
}
