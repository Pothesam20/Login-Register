package com.auth.service;

import com.auth.dto.UserProfileDTO;
import com.auth.exception.ResourceNotFoundException;
import com.auth.model.User;
import com.auth.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDateOfBirth(user.getDateOfBirth().toString());
        dto.setFavoriteColor(user.getFavoriteColor());
        dto.setNickName(user.getNickName());
        dto.setPetName(user.getPetName());
        return dto;
    }

    public UserProfileDTO updateUserProfile(String username, UserProfileDTO profileDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        user.setPhoneNumber(profileDTO.getPhoneNumber());
        user.setFavoriteColor(profileDTO.getFavoriteColor());
        user.setNickName(profileDTO.getNickName());
        user.setPetName(profileDTO.getPetName());

        User updatedUser = userRepository.save(user);

        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(updatedUser.getId());
        dto.setUsername(updatedUser.getUsername());
        dto.setPhoneNumber(updatedUser.getPhoneNumber());
        dto.setDateOfBirth(updatedUser.getDateOfBirth().toString());
        dto.setFavoriteColor(updatedUser.getFavoriteColor());
        dto.setNickName(updatedUser.getNickName());
        dto.setPetName(updatedUser.getPetName());
        return dto;
    }
}
