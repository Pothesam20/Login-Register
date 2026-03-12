package com.userprofile.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "QUESTIONS")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_seq")
    @SequenceGenerator(name = "question_seq", sequenceName = "QUESTION_SEQ", allocationSize = 1)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "TITLE", nullable = false, length = 500)
    private String title;

    @Lob
    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "TAGS", length = 500)
    private String tags;

    @Column(name = "VIEWS", nullable = false)
    private Integer views = 0;

    @Column(name = "VOTES", nullable = false)
    private Integer votes = 0;

    @Column(name = "ANSWER_COUNT", nullable = false)
    private Integer answerCount = 0;

    @Column(name = "IS_ANSWERED", nullable = false)
    private Integer isAnswered = 0;

    @Column(name = "ACCEPTED_ANSWER_ID")
    private Long acceptedAnswerId;

    @CreationTimestamp
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", insertable = false, updatable = false)
    private UserProfile userProfile;

    public Question() {}

    public Question(Long questionId, Long userId, String title, String content, String tags,
                   Integer views, Integer votes, Integer answerCount, Integer isAnswered,
                   Long acceptedAnswerId, LocalDateTime createdAt, LocalDateTime updatedAt,
                   UserProfile userProfile) {
        this.questionId = questionId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.views = views;
        this.votes = votes;
        this.answerCount = answerCount;
        this.isAnswered = isAnswered;
        this.acceptedAnswerId = acceptedAnswerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userProfile = userProfile;
    }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }

    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }

    public Integer getAnswerCount() { return answerCount; }
    public void setAnswerCount(Integer answerCount) { this.answerCount = answerCount; }

    public Integer getIsAnswered() { return isAnswered; }
    public void setIsAnswered(Integer isAnswered) { this.isAnswered = isAnswered; }

    public Long getAcceptedAnswerId() { return acceptedAnswerId; }
    public void setAcceptedAnswerId(Long acceptedAnswerId) { this.acceptedAnswerId = acceptedAnswerId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public UserProfile getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfile userProfile) { this.userProfile = userProfile; }
}
