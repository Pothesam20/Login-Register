package com.userprofile.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ANSWERS")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_seq")
    @SequenceGenerator(name = "answer_seq", sequenceName = "ANSWER_SEQ", allocationSize = 1)
    @Column(name = "ANSWER_ID")
    private Long answerId;

    @Column(name = "QUESTION_ID", nullable = false)
    private Long questionId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Lob
    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "VOTES", nullable = false)
    private Integer votes = 0;

    @Column(name = "IS_ACCEPTED", nullable = false)
    private Integer isAccepted = 0;

    @CreationTimestamp
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID", insertable = false, updatable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", insertable = false, updatable = false)
    private UserProfile userProfile;

    public Answer() {}

    public Answer(Long answerId, Long questionId, Long userId, String content, Integer votes,
                 Integer isAccepted, LocalDateTime createdAt, LocalDateTime updatedAt,
                 Question question, UserProfile userProfile) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.userId = userId;
        this.content = content;
        this.votes = votes;
        this.isAccepted = isAccepted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.question = question;
        this.userProfile = userProfile;
    }

    public Long getAnswerId() { return answerId; }
    public void setAnswerId(Long answerId) { this.answerId = answerId; }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }

    public Integer getIsAccepted() { return isAccepted; }
    public void setIsAccepted(Integer isAccepted) { this.isAccepted = isAccepted; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public UserProfile getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfile userProfile) { this.userProfile = userProfile; }
}
