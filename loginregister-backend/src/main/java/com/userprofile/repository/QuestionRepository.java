package com.userprofile.repository;

import com.userprofile.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Question> findAllByOrderByCreatedAtDesc();
    
    List<Question> findAllByOrderByVotesDesc();
    
    List<Question> findAllByOrderByViewsDesc();
    
    @Query("SELECT q FROM Question q WHERE q.tags LIKE CONCAT('%', :tag, '%') ORDER BY q.createdAt DESC")
    List<Question> findByTagContaining(String tag);
    
    @Query("SELECT q FROM Question q WHERE LOWER(CAST(q.title AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(CAST(q.content AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY q.createdAt DESC")
    List<Question> searchQuestions(String keyword);
}
