# Login Register Backend - Spring Boot with Oracle Database

A comprehensive Spring Boot 3.x backend for authentication and user management system with Oracle Database integration.

## Prerequisites

- Java 17+
- Maven 3.8+
- Oracle Database 19c or Oracle XE
- Git

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security 6.x with JWT Authentication
- **Database**: Oracle 19c / XE
- **ORM**: Hibernate & Spring Data JPA
- **Password Encoding**: BCrypt
- **JWT**: JJWT 0.12.3
- **Build Tool**: Maven
- **Code Generation**: Lombok

## Project Structure

```
loginregister-backend/
├── src/main/java/com/auth/
│   ├── config/              # Spring Security & Application Config
│   ├── controller/          # REST API Endpoints
│   ├── service/             # Business Logic
│   ├── repository/          # Data Access Layer
│   ├── model/               # Entity Classes
│   ├── dto/                 # Data Transfer Objects
│   ├── security/            # JWT & Authentication
│   └── exception/           # Exception Handling
├── src/main/resources/
│   └── application.yml      # Application Configuration
└── pom.xml                  # Maven Dependencies
```

## Database Setup

### 1. Create Oracle Sequence

```sql
CREATE SEQUENCE USER_SEQ START WITH 1 INCREMENT BY 1;
```

### 2. Create Tablespace (Optional)

```sql
CREATE TABLESPACE users_ts
DATAFILE 'users_ts.dbf' SIZE 100M
AUTOEXTEND ON NEXT 10M;
```

### 3. Hibernate will auto-create the USERS table on first run

The application will automatically create the `USERS` table with the following structure:

```sql
CREATE TABLE USERS (
    ID NUMBER PRIMARY KEY,
    USERNAME VARCHAR2(100) NOT NULL UNIQUE,
    PASSWORD VARCHAR2(255) NOT NULL,
    PHONE_NUMBER VARCHAR2(20),
    DATE_OF_BIRTH DATE,
    FAVORITE_COLOR VARCHAR2(100),
    NICK_NAME VARCHAR2(100),
    PET_NAME VARCHAR2(100),
    ROLE VARCHAR2(50),
    CREATED_AT TIMESTAMP,
    UPDATED_AT TIMESTAMP
);
```

## Configuration

### Update Oracle Database Credentials

Edit `src/main/resources/application.yml`:

```yaml
spring.datasource.url=jdbc:oracle:thin:@your-host:1521:your-db-name
spring.datasource.username=your-username
spring.datasource.password=your-password
```

### JWT Secret Configuration

Customize the JWT secret in `application.yml`:

```yaml
app.jwtSecret=your-secret-key-min-32-chars
app.jwtExpirationMs=86400000  # 24 hours in milliseconds
```

### CORS Configuration

Update allowed origins in `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://your-frontend-url"));
```

## Building & Running

### Build the Project

```bash
mvn clean install
```

### Run the Application

```bash
mvn spring-boot:run
```

Or using Java:

```bash
java -jar target/loginregister-backend-1.0.0.jar
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1995-05-20",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "favoriteColor": "Blue",
  "nickName": "Johnny",
  "petName": "Max"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1995-05-20",
  "message": "User registered successfully"
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "Password@123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1995-05-20",
  "message": "Login successful"
}
```

#### 3. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "username": "john_doe",
  "phoneNumber": "1234567890",
  "favoriteColor": "Blue",
  "nickName": "Johnny",
  "petName": "Max",
  "newPassword": "NewPass@456",
  "confirmPassword": "NewPass@456"
}
```

#### 4. Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "oldPassword": "Password@123",
  "newPassword": "NewPass@456",
  "confirmPassword": "NewPass@456"
}
```

### User Endpoints (JWT Protected)

#### 1. Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1995-05-20",
  "favoriteColor": "Blue",
  "nickName": "Johnny",
  "petName": "Max"
}
```

#### 2. Update User Profile
```http
PUT /api/user/profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "favoriteColor": "Red",
  "nickName": "Jonathan",
  "petName": "Buddy"
}
```

## Password Requirements

- **Length**: 5-12 characters
- **Must contain**: At least 1 uppercase letter
- **Must contain**: At least 1 special character (!@#$%^&*()_+-=[]{};':"\\|,.<>/?`)

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "timestamp": "2024-01-31T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Username already exists",
  "path": "/api/auth/register",
  "validationErrors": {
    "username": "Username must be unique"
  }
}
```

## Security Features

- ✅ JWT Token-based Authentication
- ✅ Stateless Session Management
- ✅ BCrypt Password Encryption
- ✅ Role-based Access Control (RBAC)
- ✅ CORS Configuration
- ✅ Spring Security Filter Chain
- ✅ Input Validation & Sanitization
- ✅ Global Exception Handling

## Testing with Postman

1. Import the API endpoints from `postman_collection.json` (if available)
2. Register a new user
3. Copy the JWT token from the response
4. Add Authorization header: `Bearer <TOKEN>`
5. Test protected endpoints

## Production Deployment

### Important Considerations

1. **Change JWT Secret**: Use a strong, unique secret (min 32 characters)
2. **Update Database Credentials**: Use production database credentials
3. **Update CORS Origins**: Configure allowed frontend URLs
4. **Environment Variables**: Use environment variables instead of hardcoding values
5. **SSL/TLS**: Enable HTTPS in production

### Example Docker Deployment

```dockerfile
FROM openjdk:17-slim
COPY target/loginregister-backend-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Troubleshooting

### Oracle Connection Issues

- Verify Oracle service is running
- Check database credentials in `application.yml`
- Ensure Oracle JDBC driver is in classpath (included in pom.xml)

### JWT Token Errors

- Check token format: `Bearer <token>`
- Verify token hasn't expired
- Confirm JWT secret matches between generation and validation

### Validation Errors

- Ensure password meets requirements
- Verify phone number is exactly 10 digits
- Check date format: `YYYY-MM-DD`

## Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth2 Integration
- [ ] Social Login (Google, GitHub)
- [ ] User Activity Logging
- [ ] Rate Limiting
- [ ] API Documentation (Swagger/OpenAPI)

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
