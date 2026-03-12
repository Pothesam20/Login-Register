package com.userprofile.entity;

import com.userprofile.enums.PostType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_POSTS")
public class UserPost {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_post_seq")
    @SequenceGenerator(name = "user_post_seq", sequenceName = "USER_POST_SEQ", allocationSize = 1)
    @Column(name = "POST_ID")
    private Long postId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "CONTENT", nullable = false, length = 2000)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "POST_TYPE", nullable = false, length = 20)
    private PostType postType;

    @CreationTimestamp
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", insertable = false, updatable = false)
    private UserProfile userProfile;

    public UserPost() {}

    public UserPost(Long postId, Long userId, String content, PostType postType, 
                   LocalDateTime createdAt, UserProfile userProfile) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.postType = postType;
        this.createdAt = createdAt;
        this.userProfile = userProfile;
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

    public UserProfile getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfile userProfile) { this.userProfile = userProfile; }
}
