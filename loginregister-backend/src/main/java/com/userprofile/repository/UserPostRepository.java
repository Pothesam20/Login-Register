package com.userprofile.repository;

import com.userprofile.entity.UserPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPostRepository extends JpaRepository<UserPost, Long> {
    List<UserPost> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserId(Long userId);
}
