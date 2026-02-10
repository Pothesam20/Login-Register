package com.userprofile.dto;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {
    private Long questionId;
    private Long userId;
    private String userName;
    private String title;
    private String content;
    private List<String> tags;
    private Integer views;
    private Integer votes;
    private Integer answerCount;
    private Boolean isAnswered;
    private Long acceptedAnswerId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public QuestionDTO() {}

    public QuestionDTO(Long questionId, Long userId, String userName, String title, String content,
                      List<String> tags, Integer views, Integer votes, Integer answerCount,
                      Boolean isAnswered, Long acceptedAnswerId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.questionId = questionId;
        this.userId = userId;
        this.userName = userName;
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
    }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }

    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }

    public Integer getAnswerCount() { return answerCount; }
    public void setAnswerCount(Integer answerCount) { this.answerCount = answerCount; }

    public Boolean getIsAnswered() { return isAnswered; }
    public void setIsAnswered(Boolean isAnswered) { this.isAnswered = isAnswered; }

    public Long getAcceptedAnswerId() { return acceptedAnswerId; }
    public void setAcceptedAnswerId(Long acceptedAnswerId) { this.acceptedAnswerId = acceptedAnswerId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
