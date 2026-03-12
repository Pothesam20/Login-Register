package com.userprofile.dto;

public class UserDashboardDTO {
    private UserProfileDTO profile;
    private UserStatsDTO stats;

    public UserDashboardDTO() {}

    public UserDashboardDTO(UserProfileDTO profile, UserStatsDTO stats) {
        this.profile = profile;
        this.stats = stats;
    }

    public UserProfileDTO getProfile() { return profile; }
    public void setProfile(UserProfileDTO profile) { this.profile = profile; }

    public UserStatsDTO getStats() { return stats; }
    public void setStats(UserStatsDTO stats) { this.stats = stats; }
}
