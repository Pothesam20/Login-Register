package com.userprofile.dto;

import java.time.LocalDateTime;

public class AnswerDTO {
    private Long answerId;
    private Long questionId;
    private Long userId;
    private String userName;
    private String content;
    private Integer votes;
    private Boolean isAccepted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AnswerDTO() {}

    public AnswerDTO(Long answerId, Long questionId, Long userId, String userName, String content,
                    Integer votes, Boolean isAccepted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.userId = userId;
        this.userName = userName;
        this.content = content;
        this.votes = votes;
        this.isAccepted = isAccepted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getAnswerId() { return answerId; }
    public void setAnswerId(Long answerId) { this.answerId = answerId; }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }

    public Boolean getIsAccepted() { return isAccepted; }
    public void setIsAccepted(Boolean isAccepted) { this.isAccepted = isAccepted; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
