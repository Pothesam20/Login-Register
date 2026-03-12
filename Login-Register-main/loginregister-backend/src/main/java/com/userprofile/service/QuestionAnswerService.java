package com.userprofile.service;

import com.userprofile.dto.*;
import com.userprofile.entity.Answer;
import com.userprofile.entity.Question;
import com.userprofile.entity.UserProfile;
import com.userprofile.repository.AnswerRepository;
import com.userprofile.repository.QuestionRepository;
import com.userprofile.repository.UserProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionAnswerService {

    private static final Logger log = LoggerFactory.getLogger(QuestionAnswerService.class);

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserProfileRepository userProfileRepository;

    public QuestionAnswerService(QuestionRepository questionRepository,
                                AnswerRepository answerRepository,
                                UserProfileRepository userProfileRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Transactional
    public QuestionDTO createQuestion(Long userId, CreateQuestionRequest request) {
        log.info("Creating question for userId: {}", userId);
        
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Question question = new Question();
        question.setUserId(userId);
        question.setTitle(request.getTitle());
        question.setContent(request.getContent());
        
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            question.setTags(String.join(",", request.getTags()));
        }
        
        question.setViews(0);
        question.setVotes(0);
        question.setAnswerCount(0);
        question.setIsAnswered(0);

        Question savedQuestion = questionRepository.save(question);
        log.info("Question created with id: {}", savedQuestion.getQuestionId());
        
        return mapToQuestionDTO(savedQuestion, user.getFullName());
    }

    @Transactional(readOnly = true)
    public QuestionDTO getQuestion(Long questionId) {
        log.info("Fetching question with id: {}", questionId);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));
        
        // Increment view count
        question.setViews(question.getViews() + 1);
        questionRepository.save(question);
        
        UserProfile user = userProfileRepository.findById(question.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return mapToQuestionDTO(question, user.getFullName());
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getAllQuestions() {
        log.info("Fetching all questions");
        List<Question> questions = questionRepository.findAllByOrderByCreatedAtDesc();
        return questions.stream()
                .map(q -> {
                    UserProfile user = userProfileRepository.findById(q.getUserId()).orElse(null);
                    return mapToQuestionDTO(q, user != null ? user.getFullName() : "Unknown");
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getUserQuestions(Long userId) {
        log.info("Fetching questions for userId: {}", userId);
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<Question> questions = questionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return questions.stream()
                .map(q -> mapToQuestionDTO(q, user.getFullName()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> searchQuestions(String keyword) {
        log.info("Searching questions with keyword: {}", keyword);
        List<Question> questions = questionRepository.searchQuestions(keyword);
        return questions.stream()
                .map(q -> {
                    UserProfile user = userProfileRepository.findById(q.getUserId()).orElse(null);
                    return mapToQuestionDTO(q, user != null ? user.getFullName() : "Unknown");
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public AnswerDTO createAnswer(Long questionId, Long userId, CreateAnswerRequest request) {
        log.info("Creating answer for questionId: {} by userId: {}", questionId, userId);
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));
        
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Answer answer = new Answer();
        answer.setQuestionId(questionId);
        answer.setUserId(userId);
        answer.setContent(request.getContent());
        answer.setVotes(0);
        answer.setIsAccepted(0);

        Answer savedAnswer = answerRepository.save(answer);
        
        // Update question answer count and status
        question.setAnswerCount(question.getAnswerCount() + 1);
        if (question.getAnswerCount() > 0) {
            question.setIsAnswered(1);
        }
        questionRepository.save(question);
        
        log.info("Answer created with id: {}", savedAnswer.getAnswerId());
        return mapToAnswerDTO(savedAnswer, user.getFullName());
    }

    @Transactional(readOnly = true)
    public List<AnswerDTO> getQuestionAnswers(Long questionId) {
        log.info("Fetching answers for questionId: {}", questionId);
        List<Answer> answers = answerRepository.findByQuestionIdOrderByVotesDescCreatedAtDesc(questionId);
        return answers.stream()
                .map(a -> {
                    UserProfile user = userProfileRepository.findById(a.getUserId()).orElse(null);
                    return mapToAnswerDTO(a, user != null ? user.getFullName() : "Unknown");
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AnswerDTO> getUserAnswers(Long userId) {
        log.info("Fetching answers for userId: {}", userId);
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<Answer> answers = answerRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return answers.stream()
                .map(a -> mapToAnswerDTO(a, user.getFullName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void acceptAnswer(Long questionId, Long answerId, Long userId) {
        log.info("Accepting answer {} for question {} by user {}", answerId, questionId, userId);
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUserId().equals(userId)) {
            throw new RuntimeException("Only question owner can accept answers");
        }
        
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        
        if (!answer.getQuestionId().equals(questionId)) {
            throw new RuntimeException("Answer does not belong to this question");
        }
        
        // Unaccept previous answer if any
        if (question.getAcceptedAnswerId() != null) {
            Answer previousAnswer = answerRepository.findById(question.getAcceptedAnswerId()).orElse(null);
            if (previousAnswer != null) {
                previousAnswer.setIsAccepted(0);
                answerRepository.save(previousAnswer);
            }
        }
        
        // Accept new answer
        answer.setIsAccepted(1);
        answerRepository.save(answer);
        
        question.setAcceptedAnswerId(answerId);
        questionRepository.save(question);
        
        log.info("Answer accepted successfully");
    }

    @Transactional
    public void voteQuestion(Long questionId, Long userId, int voteType) {
        log.info("Voting on question {} by user {} with vote {}", questionId, userId, voteType);
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        question.setVotes(question.getVotes() + voteType);
        questionRepository.save(question);
        
        log.info("Question vote updated");
    }

    @Transactional
    public void voteAnswer(Long answerId, Long userId, int voteType) {
        log.info("Voting on answer {} by user {} with vote {}", answerId, userId, voteType);
        
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        
        answer.setVotes(answer.getVotes() + voteType);
        answerRepository.save(answer);
        
        log.info("Answer vote updated");
    }

    // Mapping methods
    private QuestionDTO mapToQuestionDTO(Question question, String userName) {
        QuestionDTO dto = new QuestionDTO();
        dto.setQuestionId(question.getQuestionId());
        dto.setUserId(question.getUserId());
        dto.setUserName(userName);
        dto.setTitle(question.getTitle());
        dto.setContent(question.getContent());
        
        if (question.getTags() != null && !question.getTags().isEmpty()) {
            dto.setTags(Arrays.asList(question.getTags().split(",")));
        }
        
        dto.setViews(question.getViews());
        dto.setVotes(question.getVotes());
        dto.setAnswerCount(question.getAnswerCount());
        dto.setIsAnswered(question.getIsAnswered() == 1);
        dto.setAcceptedAnswerId(question.getAcceptedAnswerId());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setUpdatedAt(question.getUpdatedAt());
        return dto;
    }

    private AnswerDTO mapToAnswerDTO(Answer answer, String userName) {
        AnswerDTO dto = new AnswerDTO();
        dto.setAnswerId(answer.getAnswerId());
        dto.setQuestionId(answer.getQuestionId());
        dto.setUserId(answer.getUserId());
        dto.setUserName(userName);
        dto.setContent(answer.getContent());
        dto.setVotes(answer.getVotes());
        dto.setIsAccepted(answer.getIsAccepted() == 1);
        dto.setCreatedAt(answer.getCreatedAt());
        dto.setUpdatedAt(answer.getUpdatedAt());
        return dto;
    }
}
