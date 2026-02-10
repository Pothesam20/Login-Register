package com.userprofile.dto;

import com.userprofile.enums.PostType;

import java.time.LocalDateTime;

public class UserPostDTO {
    private Long postId;
    private Long userId;
    private String content;
    private PostType postType;
    private LocalDateTime createdAt;
    private String userName;

    public UserPostDTO() {}

    public UserPostDTO(Long postId, Long userId, String content, PostType postType, 
                      LocalDateTime createdAt, String userName) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.postType = postType;
        this.createdAt = createdAt;
        this.userName = userName;
    }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public PostType getPostType() { return postType; }
    public void setPostType(PostType postType) { this.postType = postType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
}
