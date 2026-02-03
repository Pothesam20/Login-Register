# Quick Start Guide - Spring Boot Backend

## 🚀 Getting Started in 5 Minutes

### Step 1: Prerequisites Check
```bash
java -version          # Should be 17+
mvn -version          # Should be 3.8+
```

### Step 2: Oracle Database Setup

#### Option A: Using Oracle XE (Recommended for Development)
```bash
# Assuming Oracle XE is already installed and running
# Connect to Oracle SQL Plus
sqlplus sys as sysdba

# Run the setup script
@database-setup.sql

# Verify
SELECT * FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'USER_SEQ';
```

#### Option B: Using Docker
```bash
docker run -d \
  --name oracle-xe \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=oracle \
  gvenzl/oracle-xe:latest
```

### Step 3: Configure Database Connection

Edit `src/main/resources/application.yml`:
```yaml
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
spring.datasource.username=system
spring.datasource.password=oracle
```

### Step 4: Build the Project
```bash
mvn clean install
```

### Step 5: Run the Application
```bash
mvn spring-boot:run
```

Expected output:
```
Started LoginRegisterBackendApplication in X.XXX seconds
```

### Step 6: Test the API

#### Register a New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "phoneNumber": "1234567890",
    "dateOfBirth": "1995-05-20",
    "password": "Password@123",
    "confirmPassword": "Password@123",
    "favoriteColor": "Blue",
    "nickName": "Test",
    "petName": "Max"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Password@123"
  }'
```

#### Get User Profile
```bash
curl -X GET http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📁 Project Structure

```
loginregister-backend/
├── src/main/java/com/auth/
│   ├── LoginRegisterBackendApplication.java  # Main entry point
│   ├── config/
│   │   └── SecurityConfig.java              # Spring Security config
│   ├── controller/
│   │   ├── AuthController.java              # Auth endpoints
│   │   └── UserController.java              # User endpoints
│   ├── service/
│   │   ├── AuthService.java                 # Auth logic
│   │   └── UserService.java                 # User logic
│   ├── model/
│   │   └── User.java                        # User entity
│   ├── dto/                                 # Data Transfer Objects
│   ├── security/
│   │   ├── JwtTokenProvider.java            # JWT handling
│   │   ├── JwtAuthenticationFilter.java     # JWT filter
│   │   └── CustomUserDetailsService.java    # User details
│   ├── repository/
│   │   └── UserRepository.java              # Database queries
│   └── exception/                           # Exception handling
├── src/main/resources/
│   └── application.yml                      # App configuration
├── pom.xml                                  # Maven dependencies
├── README.md                                # Full documentation
├── database-setup.sql                       # Database script
└── .env.example                             # Environment template
```

## 🔑 Key Features Implemented

✅ User Registration with validation
✅ User Login with JWT authentication
✅ Forgot Password with security questions
✅ Change Password functionality
✅ Get User Profile (JWT protected)
✅ Update User Profile
✅ BCrypt password encryption
✅ Global exception handling
✅ CORS support for React frontend
✅ Role-based access control

## 🛠 Common Issues & Solutions

### Issue: "ORA-12514: TNS:listener does not currently know of service"
**Solution**: Check if Oracle service is running
```bash
# On Windows
sqlplus sys as sysdba

# On Linux
sudo systemctl start oracle-database
```

### Issue: "Connection refused"
**Solution**: Verify database URL and credentials in `application.yml`

### Issue: "Table USERS not found"
**Solution**: Run `database-setup.sql` in Oracle SQL Plus or let Hibernate create it

### Issue: "JWT token expired"
**Solution**: Generate a new token by logging in again

## 📚 API Documentation

See [README.md](README.md) for complete API documentation

## 🔐 Production Checklist

- [ ] Change JWT secret to a strong value (min 32 chars)
- [ ] Update database credentials
- [ ] Configure CORS for production frontend URL
- [ ] Enable HTTPS/SSL
- [ ] Set up logging and monitoring
- [ ] Configure environment variables
- [ ] Test all endpoints
- [ ] Set up database backups
- [ ] Update spring.jpa.hibernate.ddl-auto to "validate"

## 📞 Support

For issues or questions, refer to README.md or create an issue.

## 🎯 Next Steps

1. Connect React frontend to this backend
2. Add email verification
3. Implement Two-Factor Authentication (2FA)
4. Add API documentation (Swagger)
5. Set up CI/CD pipeline
