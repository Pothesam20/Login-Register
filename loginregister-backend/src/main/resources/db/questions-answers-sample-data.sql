-- ============================================
-- Sample Data for Questions and Answers
-- ============================================

-- Insert sample questions
INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT)
VALUES (
    QUESTION_SEQ.NEXTVAL,
    1,
    'How to implement JWT authentication in Spring Boot?',
    'I am trying to implement JWT authentication in my Spring Boot application. I have added the dependencies but I am not sure how to configure the security. Can someone help me with a step-by-step guide?',
    'java,spring-boot,jwt,security',
    125,
    15,
    0,
    0,
    CURRENT_TIMESTAMP - INTERVAL '2' DAY
);

INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT)
VALUES (
    QUESTION_SEQ.NEXTVAL,
    1,
    'React useState vs useReducer - When to use which?',
    'I am confused about when to use useState and when to use useReducer in React. Can someone explain the differences and provide examples of when each should be used?',
    'react,javascript,hooks,state-management',
    89,
    12,
    0,
    0,
    CURRENT_TIMESTAMP - INTERVAL '1' DAY
);

INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT)
VALUES (
    QUESTION_SEQ.NEXTVAL,
    1,
    'Oracle database connection timeout in Spring Boot',
    'My Spring Boot application is experiencing connection timeouts when connecting to Oracle database. The error occurs after the application has been idle for some time. How can I configure HikariCP to handle this?',
    'oracle,spring-boot,database,hikaricp',
    67,
    8,
    0,
    0,
    CURRENT_TIMESTAMP - INTERVAL '5' HOUR
);

INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT)
VALUES (
    QUESTION_SEQ.NEXTVAL,
    1,
    'Best practices for REST API design',
    'What are the best practices for designing RESTful APIs? I want to make sure my API is well-structured, scalable, and follows industry standards.',
    'rest-api,api-design,best-practices,web-services',
    234,
    28,
    0,
    0,
    CURRENT_TIMESTAMP - INTERVAL '3' DAY
);

INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT)
VALUES (
    QUESTION_SEQ.NEXTVAL,
    1,
    'How to optimize React application performance?',
    'My React application is becoming slow as it grows. What are some techniques to optimize performance? I have heard about React.memo, useMemo, and useCallback but not sure how to use them effectively.',
    'react,performance,optimization,javascript',
    156,
    19,
    0,
    0,
    CURRENT_TIMESTAMP - INTERVAL '12' HOUR
);

-- Insert sample answers for the first question
INSERT INTO ANSWERS (ANSWER_ID, QUESTION_ID, USER_ID, CONTENT, VOTES, IS_ACCEPTED, CREATED_AT)
VALUES (
    ANSWER_SEQ.NEXTVAL,
    1,
    1,
    'Here is a step-by-step guide to implement JWT authentication in Spring Boot:

1. Add dependencies to pom.xml:
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

2. Create a JwtUtil class to generate and validate tokens
3. Configure Spring Security with JWT filter
4. Create authentication endpoints

Let me know if you need more details on any step!',
    5,
    0,
    CURRENT_TIMESTAMP - INTERVAL '1' DAY
);

INSERT INTO ANSWERS (ANSWER_ID, QUESTION_ID, USER_ID, CONTENT, VOTES, IS_ACCEPTED, CREATED_AT)
VALUES (
    ANSWER_SEQ.NEXTVAL,
    1,
    1,
    'I recommend using Spring Security with JWT. Here is a complete example:

First, create a JWT utility class that handles token generation and validation. Then configure your security filter chain to use JWT authentication. Make sure to handle token expiration and refresh tokens properly.

You can find a complete working example in my GitHub repository: [link]',
    3,
    0,
    CURRENT_TIMESTAMP - INTERVAL '18' HOUR
);

-- Update answer count for question 1
UPDATE QUESTIONS SET ANSWER_COUNT = 2 WHERE QUESTION_ID = 1;

-- Insert sample votes
INSERT INTO QUESTION_VOTES (VOTE_ID, QUESTION_ID, USER_ID, VOTE_TYPE, CREATED_AT)
VALUES (QUESTION_VOTE_SEQ.NEXTVAL, 1, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO ANSWER_VOTES (VOTE_ID, ANSWER_ID, USER_ID, VOTE_TYPE, CREATED_AT)
VALUES (ANSWER_VOTE_SEQ.NEXTVAL, 1, 1, 1, CURRENT_TIMESTAMP);

COMMIT;

PROMPT
PROMPT ============================================
PROMPT Sample questions and answers inserted successfully!
PROMPT ============================================
