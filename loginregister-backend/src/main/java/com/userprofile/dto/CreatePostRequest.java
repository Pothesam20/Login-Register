package com.userprofile.dto;

import com.userprofile.enums.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {
    
    @NotBlank(message = "Content is required")
    @Size(max = 2000, message = "Content must not exceed 2000 characters")
    private String content;
    
    @NotNull(message = "Post type is required")
    private PostType postType;

    public CreatePostRequest() {}

    public CreatePostRequest(String content, PostType postType) {
        this.content = content;
        this.postType = postType;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public PostType getPostType() { return postType; }
    public void setPostType(PostType postType) { this.postType = postType; }
}
