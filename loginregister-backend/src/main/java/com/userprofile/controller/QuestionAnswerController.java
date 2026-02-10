package com.userprofile.controller;

import com.userprofile.dto.*;
import com.userprofile.service.QuestionAnswerService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "*")
public class QuestionAnswerController {

    private static final Logger log = LoggerFactory.getLogger(QuestionAnswerController.class);

    private final QuestionAnswerService questionAnswerService;

    public QuestionAnswerController(QuestionAnswerService questionAnswerService) {
        this.questionAnswerService = questionAnswerService;
    }

    /**
     * Create a new question
     * POST /api/questions?userId={userId}
     */
    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(
            @RequestParam Long userId,
            @Valid @RequestBody CreateQuestionRequest request) {
        log.info("REST request to create question by userId: {}", userId);
        try {
            QuestionDTO question = questionAnswerService.createQuestion(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(question);
        } catch (RuntimeException e) {
            log.error("Error creating question: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get all questions
     * GET /api/questions
     */
    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        log.info("REST request to get all questions");
        try {
            List<QuestionDTO> questions = questionAnswerService.getAllQuestions();
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            log.error("Error fetching questions: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get question by ID
     * GET /api/questions/{questionId}
     */
    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDTO> getQuestion(@PathVariable Long questionId) {
        log.info("REST request to get question with id: {}", questionId);
        try {
            QuestionDTO question = questionAnswerService.getQuestion(questionId);
            return ResponseEntity.ok(question);
        } catch (RuntimeException e) {
            log.error("Error fetching question: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Get questions by user
     * GET /api/questions/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuestionDTO>> getUserQuestions(@PathVariable Long userId) {
        log.info("REST request to get questions for userId: {}", userId);
        try {
            List<QuestionDTO> questions = questionAnswerService.getUserQuestions(userId);
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            log.error("Error fetching user questions: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Search questions
     * GET /api/questions/search?keyword={keyword}
     */
    @GetMapping("/search")
    public ResponseEntity<List<QuestionDTO>> searchQuestions(@RequestParam String keyword) {
        log.info("REST request to search questions with keyword: {}", keyword);
        try {
            List<QuestionDTO> questions = questionAnswerService.searchQuestions(keyword);
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            log.error("Error searching questions: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create an answer for a question
     * POST /api/questions/{questionId}/answers?userId={userId}
     */
    @PostMapping("/{questionId}/answers")
    public ResponseEntity<AnswerDTO> createAnswer(
            @PathVariable Long questionId,
            @RequestParam Long userId,
            @Valid @RequestBody CreateAnswerRequest request) {
        log.info("REST request to create answer for questionId: {} by userId: {}", questionId, userId);
        try {
            AnswerDTO answer = questionAnswerService.createAnswer(questionId, userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(answer);
        } catch (RuntimeException e) {
            log.error("Error creating answer: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get all answers for a question
     * GET /api/questions/{questionId}/answers
     */
    @GetMapping("/{questionId}/answers")
    public ResponseEntity<List<AnswerDTO>> getQuestionAnswers(@PathVariable Long questionId) {
        log.info("REST request to get answers for questionId: {}", questionId);
        try {
            List<AnswerDTO> answers = questionAnswerService.getQuestionAnswers(questionId);
            return ResponseEntity.ok(answers);
        } catch (RuntimeException e) {
            log.error("Error fetching answers: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Get answers by user
     * GET /api/questions/answers/user/{userId}
     */
    @GetMapping("/answers/user/{userId}")
    public ResponseEntity<List<AnswerDTO>> getUserAnswers(@PathVariable Long userId) {
        log.info("REST request to get answers for userId: {}", userId);
        try {
            List<AnswerDTO> answers = questionAnswerService.getUserAnswers(userId);
            return ResponseEntity.ok(answers);
        } catch (RuntimeException e) {
            log.error("Error fetching user answers: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Accept an answer
     * PUT /api/questions/{questionId}/answers/{answerId}/accept?userId={userId}
     */
    @PutMapping("/{questionId}/answers/{answerId}/accept")
    public ResponseEntity<Void> acceptAnswer(
            @PathVariable Long questionId,
            @PathVariable Long answerId,
            @RequestParam Long userId) {
        log.info("REST request to accept answer {} for question {} by user {}", answerId, questionId, userId);
        try {
            questionAnswerService.acceptAnswer(questionId, answerId, userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Error accepting answer: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Vote on a question
     * POST /api/questions/{questionId}/vote?userId={userId}&voteType={1 or -1}
     */
    @PostMapping("/{questionId}/vote")
    public ResponseEntity<Void> voteQuestion(
            @PathVariable Long questionId,
            @RequestParam Long userId,
            @RequestParam int voteType) {
        log.info("REST request to vote on question {} by user {} with vote {}", questionId, userId, voteType);
        try {
            questionAnswerService.voteQuestion(questionId, userId, voteType);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Error voting on question: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Vote on an answer
     * POST /api/questions/answers/{answerId}/vote?userId={userId}&voteType={1 or -1}
     */
    @PostMapping("/answers/{answerId}/vote")
    public ResponseEntity<Void> voteAnswer(
            @PathVariable Long answerId,
            @RequestParam Long userId,
            @RequestParam int voteType) {
        log.info("REST request to vote on answer {} by user {} with vote {}", answerId, userId, voteType);
        try {
            questionAnswerService.voteAnswer(answerId, userId, voteType);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Error voting on answer: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
