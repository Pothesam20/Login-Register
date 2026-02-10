package com.userprofile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {
    
    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;
    
    @Size(max = 50, message = "Role must not exceed 50 characters")
    private String role;
    
    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;
    
    @Size(max = 200, message = "Website must not exceed 200 characters")
    private String website;
    
    @Size(max = 500, message = "Bio must not exceed 500 characters")
    private String bio;

    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String fullName, String role, String location, String website, String bio) {
        this.fullName = fullName;
        this.role = role;
        this.location = location;
        this.website = website;
        this.bio = bio;
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
