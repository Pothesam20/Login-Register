package com.userprofile.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateAnswerRequest {
    
    @NotBlank(message = "Content is required")
    private String content;

    public CreateAnswerRequest() {}

    public CreateAnswerRequest(String content) {
        this.content = content;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
