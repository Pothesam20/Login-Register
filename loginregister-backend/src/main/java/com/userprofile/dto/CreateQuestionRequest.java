package com.userprofile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CreateQuestionRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 500, message = "Title must not exceed 500 characters")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private List<String> tags;

    public CreateQuestionRequest() {}

    public CreateQuestionRequest(String title, String content, List<String> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
