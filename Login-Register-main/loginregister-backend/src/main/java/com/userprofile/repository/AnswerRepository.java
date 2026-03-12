package com.userprofile.repository;

import com.userprofile.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    
    List<Answer> findByQuestionIdOrderByVotesDescCreatedAtDesc(Long questionId);
    
    List<Answer> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    long countByQuestionId(Long questionId);
}
