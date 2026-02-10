# Questions and Answers API Documentation

Complete REST API documentation for Questions and Answers feature.

## Base URL
```
http://localhost:8080/api
```

## Database Tables

### QUESTIONS Table
- QUESTION_ID (PK)
- USER_ID (FK)
- TITLE
- CONTENT
- TAGS
- VIEWS
- VOTES
- ANSWER_COUNT
- IS_ANSWERED
- ACCEPTED_ANSWER_ID
- CREATED_AT
- UPDATED_AT

### ANSWERS Table
- ANSWER_ID (PK)
- QUESTION_ID (FK)
- USER_ID (FK)
- CONTENT
- VOTES
- IS_ACCEPTED
- CREATED_AT
- UPDATED_AT

## API Endpoints

### 1. Create Question

**POST** `/questions?userId={userId}`

Create a new question.

**Request Body:**
```json
{
  "title": "How to implement JWT authentication in Spring Boot?",
  "content": "I am trying to implement JWT authentication...",
  "tags": ["java", "spring-boot", "jwt", "security"]
}
```

**Response:** `201 CREATED`
```json
{
  "questionId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "How to implement JWT authentication in Spring Boot?",
  "content": "I am trying to implement JWT authentication...",
  "tags": ["java", "spring-boot", "jwt", "security"],
  "views": 0,
  "votes": 0,
  "answerCount": 0,
  "isAnswered": false,
  "acceptedAnswerId": null,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

---

### 2. Get All Questions

**GET** `/questions`

Retrieve all questions (sorted by newest first).

**Response:** `200 OK`
```json
[
  {
    "questionId": 1,
    "userId": 1,
    "userName": "John Doe",
    "title": "How to implement JWT authentication?",
    "content": "...",
    "tags": ["java", "spring-boot"],
    "views": 125,
    "votes": 15,
    "answerCount": 3,
    "isAnswered": true,
    "acceptedAnswerId": 5,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T14:20:00"
  }
]
```

---

### 3. Get Question by ID

**GET** `/questions/{questionId}`

Retrieve a specific question (increments view count).

**Response:** `200 OK`
```json
{
  "questionId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "How to implement JWT authentication?",
  "content": "Full question content...",
  "tags": ["java", "spring-boot", "jwt"],
  "views": 126,
  "votes": 15,
  "answerCount": 3,
  "isAnswered": true,
  "acceptedAnswerId": 5,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T14:20:00"
}
```

---

### 4. Get User Questions

**GET** `/questions/user/{userId}`

Retrieve all questions asked by a specific user.

**Response:** `200 OK`
```json
[
  {
    "questionId": 1,
    "userId": 1,
    "userName": "John Doe",
    "title": "Question title",
    "content": "...",
    "tags": ["tag1", "tag2"],
    "views": 100,
    "votes": 10,
    "answerCount": 2,
    "isAnswered": true,
    "acceptedAnswerId": null,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

---

### 5. Search Questions

**GET** `/questions/search?keyword={keyword}`

Search questions by keyword in title or content.

**Example:** `/questions/search?keyword=spring boot`

**Response:** `200 OK`
```json
[
  {
    "questionId": 1,
    "title": "Spring Boot configuration issue",
    "content": "...",
    ...
  }
]
```

---

### 6. Create Answer

**POST** `/questions/{questionId}/answers?userId={userId}`

Create an answer for a question.

**Request Body:**
```json
{
  "content": "Here is how you can implement JWT authentication..."
}
```

**Response:** `201 CREATED`
```json
{
  "answerId": 1,
  "questionId": 1,
  "userId": 1,
  "userName": "John Doe",
  "content": "Here is how you can implement JWT authentication...",
  "votes": 0,
  "isAccepted": false,
  "createdAt": "2024-01-15T11:00:00",
  "updatedAt": "2024-01-15T11:00:00"
}
```

---

### 7. Get Question Answers

**GET** `/questions/{questionId}/answers`

Retrieve all answers for a question (sorted by votes, then date).

**Response:** `200 OK`
```json
[
  {
    "answerId": 1,
    "questionId": 1,
    "userId": 2,
    "userName": "Jane Smith",
    "content": "Answer content...",
    "votes": 10,
    "isAccepted": true,
    "createdAt": "2024-01-15T11:00:00",
    "updatedAt": "2024-01-15T11:00:00"
  }
]
```

---

### 8. Get User Answers

**GET** `/questions/answers/user/{userId}`

Retrieve all answers posted by a specific user.

**Response:** `200 OK`
```json
[
  {
    "answerId": 1,
    "questionId": 1,
    "userId": 1,
    "userName": "John Doe",
    "content": "Answer content...",
    "votes": 5,
    "isAccepted": false,
    "createdAt": "2024-01-15T11:00:00",
    "updatedAt": "2024-01-15T11:00:00"
  }
]
```

---

### 9. Accept Answer

**PUT** `/questions/{questionId}/answers/{answerId}/accept?userId={userId}`

Mark an answer as accepted (only question owner can do this).

**Response:** `200 OK`

---

### 10. Vote on Question

**POST** `/questions/{questionId}/vote?userId={userId}&voteType={1 or -1}`

Vote on a question.
- `voteType=1` for upvote
- `voteType=-1` for downvote

**Response:** `200 OK`

---

### 11. Vote on Answer

**POST** `/questions/answers/{answerId}/vote?userId={userId}&voteType={1 or -1}`

Vote on an answer.
- `voteType=1` for upvote
- `voteType=-1` for downvote

**Response:** `200 OK`

---

## Testing with cURL

### Create a Question
```bash
curl -X POST "http://localhost:8080/api/questions?userId=1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to use React Hooks?",
    "content": "I am new to React Hooks and need help understanding useState and useEffect.",
    "tags": ["react", "javascript", "hooks"]
  }'
```

### Get All Questions
```bash
curl http://localhost:8080/api/questions
```

### Get Question by ID
```bash
curl http://localhost:8080/api/questions/1
```

### Search Questions
```bash
curl "http://localhost:8080/api/questions/search?keyword=spring"
```

### Create an Answer
```bash
curl -X POST "http://localhost:8080/api/questions/1/answers?userId=1" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Here is a detailed explanation of React Hooks..."
  }'
```

### Get Question Answers
```bash
curl http://localhost:8080/api/questions/1/answers
```

### Accept an Answer
```bash
curl -X PUT "http://localhost:8080/api/questions/1/answers/1/accept?userId=1"
```

### Vote on Question (Upvote)
```bash
curl -X POST "http://localhost:8080/api/questions/1/vote?userId=1&voteType=1"
```

### Vote on Answer (Downvote)
```bash
curl -X POST "http://localhost:8080/api/questions/answers/1/vote?userId=1&voteType=-1"
```

---

## Setup Instructions

### 1. Create Database Tables

```bash
sqlplus userprofile/UserProfile123@localhost:1521/ORCL @src/main/resources/db/questions-answers-schema.sql
```

### 2. Load Sample Data (Optional)

```bash
sqlplus userprofile/UserProfile123@localhost:1521/ORCL @src/main/resources/db/questions-answers-sample-data.sql
```

### 3. Restart Backend

```bash
cd loginregister-backend
mvn spring-boot:run
```

### 4. Test API

```bash
curl http://localhost:8080/api/questions
```

---

## Features

✅ Create and view questions  
✅ Create and view answers  
✅ Search questions by keyword  
✅ Vote on questions and answers  
✅ Accept answers (by question owner)  
✅ Track views, votes, and answer counts  
✅ Tag-based categorization  
✅ User attribution for all content  
✅ Automatic answer count updates  
✅ Timestamp tracking (created/updated)  

---

## Database Triggers

The schema includes automatic triggers for:
- Updating `UPDATED_AT` timestamp on modifications
- Incrementing/decrementing answer count when answers are added/deleted
- Maintaining data integrity

---

## Error Responses

### 404 Not Found
```json
{
  "status": 404,
  "message": "Question not found with id: 1",
  "timestamp": "2024-01-15T14:30:00"
}
```

### 400 Bad Request
```json
{
  "title": "Title is required",
  "content": "Content is required"
}
```

---

## Integration with User Profile

Questions and answers are linked to user profiles:
- Each question/answer has a `userId` foreign key
- User names are included in responses
- User statistics can be extended to include question/answer counts

---

## Next Steps

1. ✅ Database tables created
2. ✅ Backend APIs implemented
3. 🔄 Create React frontend components
4. 🔄 Integrate with user dashboard
5. 🔄 Add real-time notifications

---

## Support

For issues or questions, check:
1. Database connection is active
2. Tables are created successfully
3. Backend is running on port 8080
4. API endpoints are accessible
