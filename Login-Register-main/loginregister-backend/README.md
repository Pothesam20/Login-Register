# User Profile Dashboard Backend

A complete Spring Boot backend application for User Profile Dashboard with Oracle Database.

## Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Spring Data JPA**: For database operations
- **Oracle Database**: Primary database
- **Lombok**: To reduce boilerplate code
- **Maven**: Build tool

## Project Structure

```
loginregister-backend/
├── src/
│   ├── main/
│   │   ├── java/com/userprofile/
│   │   │   ├── controller/          # REST Controllers
│   │   │   ├── service/             # Business Logic
│   │   │   ├── repository/          # Data Access Layer
│   │   │   ├── entity/              # JPA Entities
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── enums/               # Enumerations
│   │   │   ├── exception/           # Exception Handling
│   │   │   └── UserProfileApplication.java
│   │   └── resources/
│   │       ├── application.yml      # Configuration
│   │       └── db/
│   │           ├── schema.sql       # Database Schema
│   │           └── sample-data.sql  # Sample Data
│   └── test/
└── pom.xml
```

## Database Schema

### Tables

1. **USER_PROFILE**
   - USER_ID (PK)
   - FULL_NAME
   - ROLE
   - EMAIL (Unique)
   - LOCATION
   - WEBSITE
   - BIO
   - PROFILE_IMAGE
   - COVER_IMAGE
   - CREATED_AT

2. **USER_STATS**
   - USER_ID (PK, FK)
   - POSTS
   - FOLLOWERS
   - FOLLOWING

3. **USER_POSTS**
   - POST_ID (PK)
   - USER_ID (FK)
   - CONTENT
   - POST_TYPE (TEXT, IMAGE, VIDEO, ARTICLE)
   - CREATED_AT

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Oracle Database 11g or higher
- Oracle JDBC Driver

### Database Setup

1. Create Oracle database user:
```sql
CREATE USER userprofile IDENTIFIED BY password;
GRANT CONNECT, RESOURCE TO userprofile;
GRANT UNLIMITED TABLESPACE TO userprofile;
```

2. Run schema creation script:
```bash
sqlplus userprofile/password@localhost:1521/ORCL @src/main/resources/db/schema.sql
```

3. (Optional) Load sample data:
```bash
sqlplus userprofile/password@localhost:1521/ORCL @src/main/resources/db/sample-data.sql
```

### Application Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@localhost:1521:ORCL
    username: your_username
    password: your_password
```

### Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Or run the JAR
java -jar target/user-profile-backend-1.0.0.jar
```

The application will start on `http://localhost:8080`

## REST API Endpoints

Base URL: `http://localhost:8080/api`

### 1. Get User Profile

**Endpoint:** `GET /users/{userId}/profile`

**Description:** Retrieve user profile information

**Response:** `200 OK`
```json
{
  "userId": 1,
  "fullName": "John Doe",
  "role": "Software Developer",
  "email": "john.doe@example.com",
  "location": "New York, USA",
  "website": "www.johndoe.com",
  "bio": "Passionate developer...",
  "profileImage": "https://example.com/profile.jpg",
  "coverImage": "https://example.com/cover.jpg",
  "createdAt": "2024-01-15T10:30:00"
}
```

### 2. Get User Statistics

**Endpoint:** `GET /users/{userId}/stats`

**Description:** Retrieve user statistics (posts, followers, following)

**Response:** `200 OK`
```json
{
  "userId": 1,
  "posts": 245,
  "followers": 1289,
  "following": 456
}
```

### 3. Get User Dashboard

**Endpoint:** `GET /users/{userId}/dashboard`

**Description:** Retrieve complete dashboard data (profile + stats)

**Response:** `200 OK`
```json
{
  "profile": {
    "userId": 1,
    "fullName": "John Doe",
    "role": "Software Developer",
    "email": "john.doe@example.com",
    "location": "New York, USA",
    "website": "www.johndoe.com",
    "bio": "Passionate developer...",
    "profileImage": "https://example.com/profile.jpg",
    "coverImage": "https://example.com/cover.jpg",
    "createdAt": "2024-01-15T10:30:00"
  },
  "stats": {
    "userId": 1,
    "posts": 245,
    "followers": 1289,
    "following": 456
  }
}
```

### 4. Update User Profile

**Endpoint:** `PUT /users/{userId}/profile`

**Description:** Update user profile information

**Request Body:**
```json
{
  "fullName": "John Doe",
  "role": "Senior Software Developer",
  "location": "San Francisco, USA",
  "website": "www.johndoe.dev",
  "bio": "Updated bio text..."
}
```

**Response:** `200 OK`
```json
{
  "userId": 1,
  "fullName": "John Doe",
  "role": "Senior Software Developer",
  "email": "john.doe@example.com",
  "location": "San Francisco, USA",
  "website": "www.johndoe.dev",
  "bio": "Updated bio text...",
  "profileImage": "https://example.com/profile.jpg",
  "coverImage": "https://example.com/cover.jpg",
  "createdAt": "2024-01-15T10:30:00"
}
```

### 5. Create Post

**Endpoint:** `POST /users/{userId}/posts`

**Description:** Create a new post (Share your thoughts)

**Request Body:**
```json
{
  "content": "Just completed an amazing project!",
  "postType": "TEXT"
}
```

**Post Types:** `TEXT`, `IMAGE`, `VIDEO`, `ARTICLE`

**Response:** `201 CREATED`
```json
{
  "postId": 1,
  "userId": 1,
  "content": "Just completed an amazing project!",
  "postType": "TEXT",
  "createdAt": "2024-01-15T14:30:00",
  "userName": "John Doe"
}
```

### 6. Get User Posts

**Endpoint:** `GET /users/{userId}/posts`

**Description:** Retrieve all posts for a user (ordered by newest first)

**Response:** `200 OK`
```json
[
  {
    "postId": 3,
    "userId": 1,
    "content": "Latest post content...",
    "postType": "TEXT",
    "createdAt": "2024-01-15T14:30:00",
    "userName": "John Doe"
  },
  {
    "postId": 2,
    "userId": 1,
    "content": "Previous post content...",
    "postType": "IMAGE",
    "createdAt": "2024-01-15T10:00:00",
    "userName": "John Doe"
  }
]
```

## Error Responses

### 404 Not Found
```json
{
  "status": 404,
  "message": "User not found with id: 1",
  "timestamp": "2024-01-15T14:30:00"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "fullName": "Full name is required",
  "bio": "Bio must not exceed 500 characters"
}
```

### 500 Internal Server Error
```json
{
  "status": 500,
  "message": "An unexpected error occurred",
  "timestamp": "2024-01-15T14:30:00"
}
```

## Testing with cURL

### Get User Dashboard
```bash
curl -X GET http://localhost:8080/api/users/1/dashboard
```

### Update Profile
```bash
curl -X PUT http://localhost:8080/api/users/1/profile \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "role": "Senior Developer",
    "location": "New York",
    "website": "www.example.com",
    "bio": "Updated bio"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:8080/api/users/1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "My new post!",
    "postType": "TEXT"
  }'
```

### Get User Posts
```bash
curl -X GET http://localhost:8080/api/users/1/posts
```

## Features

✅ Layered architecture (Controller → Service → Repository)  
✅ Spring Data JPA with Oracle Database  
✅ RESTful API design  
✅ DTO pattern for clean API responses  
✅ Input validation with Bean Validation  
✅ Global exception handling  
✅ Transaction management  
✅ Logging with SLF4J  
✅ CORS enabled for frontend integration  
✅ Oracle-compatible ID generation strategy  
✅ Proper HTTP status codes  

## Notes

- **No Password Fields**: As per requirements, this backend does not include any password, change password, or authentication features
- **Production Ready**: Includes proper error handling, logging, and transaction management
- **Scalable**: Uses layered architecture for easy maintenance and testing
- **Database Agnostic**: Can be easily adapted to other databases by changing the dialect

## License

MIT License
