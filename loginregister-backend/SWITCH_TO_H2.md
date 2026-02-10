# Switch to H2 Database (Easiest Option)

## Why H2?

If you don't have Oracle installed or don't want to deal with Oracle setup, H2 is perfect for development:

✅ **No installation required** - Built into Spring Boot  
✅ **Starts instantly** - No services to manage  
✅ **Web console** - View data in browser  
✅ **Perfect for development** - Fast and simple  
✅ **Works immediately** - No configuration needed  

❌ **Data is temporary** - Lost when app stops (can be changed to file-based)

## Quick Switch (3 Steps)

### Step 1: Update pom.xml

Add H2 dependency (Oracle will be ignored):

```xml
<!-- Add this after the Oracle dependency -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

You don't need to remove Oracle dependency, just add H2.

### Step 2: Update application.properties

Replace the Oracle configuration with H2:

```properties
# Application Name
spring.application.name=user-profile-backend

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# H2 Database Configuration (In-Memory)
spring.datasource.url=jdbc:h2:mem:userprofiledb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (Access at http://localhost:8080/api/h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA / Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Hibernate Properties
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true

# Logging Configuration
logging.level.com.userprofile=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### Step 3: Restart Backend

```bash
cd loginregister-backend
mvn clean package -DskipTests
java -jar target\user-profile-backend-1.0.0.jar
```

**You should see:**
```
HikariPool-1 - Start completed.
Started UserProfileApplication in 3.5 seconds
```

✅ **No database errors!**

## Access H2 Console

1. Start the backend
2. Open browser: http://localhost:8080/api/h2-console
3. Use these settings:
   - **JDBC URL:** `jdbc:h2:mem:userprofiledb`
   - **User Name:** `sa`
   - **Password:** (leave empty)
4. Click "Connect"

You can now see all tables and data!

## Load Sample Data

Since H2 creates tables automatically, you can insert sample data via the H2 console or API.

### Option 1: Via H2 Console

1. Open http://localhost:8080/api/h2-console
2. Run this SQL:

```sql
-- Insert sample user
INSERT INTO USER_PROFILE (USER_ID, FULL_NAME, ROLE, EMAIL, LOCATION, WEBSITE, BIO, CREATED_AT) 
VALUES (1, 'John Doe', 'Software Developer', 'john@example.com', 'New York', 'https://johndoe.com', 'Passionate developer', CURRENT_TIMESTAMP);

-- Insert user stats
INSERT INTO USER_STATS (USER_ID, POSTS, FOLLOWERS, FOLLOWING) 
VALUES (1, 5, 120, 80);

-- Insert sample posts
INSERT INTO USER_POSTS (POST_ID, USER_ID, CONTENT, POST_TYPE, CREATED_AT) 
VALUES (1, 1, 'Hello World! This is my first post.', 'TEXT', CURRENT_TIMESTAMP);

INSERT INTO USER_POSTS (POST_ID, USER_ID, CONTENT, POST_TYPE, CREATED_AT) 
VALUES (2, 1, 'Check out my new project!', 'ARTICLE', CURRENT_TIMESTAMP);

-- Insert sample question
INSERT INTO QUESTIONS (QUESTION_ID, USER_ID, TITLE, CONTENT, TAGS, VIEWS, VOTES, ANSWER_COUNT, IS_ANSWERED, CREATED_AT, UPDATED_AT) 
VALUES (1, 1, 'How to connect React with Spring Boot?', 'I need help connecting my React frontend to Spring Boot backend.', 'react,spring-boot,api', 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

### Option 2: Via API (Postman/curl)

```bash
# Create a post
curl -X POST http://localhost:8080/api/users/1/posts \
  -H "Content-Type: application/json" \
  -d "{\"content\":\"Hello World!\",\"postType\":\"TEXT\"}"

# Create a question
curl -X POST "http://localhost:8080/api/questions?userId=1" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Question\",\"content\":\"This is a test\",\"tags\":[\"test\"]}"
```

## Make H2 Data Persistent (Optional)

If you want data to survive restarts, use file-based H2:

```properties
# File-based H2 (data persists)
spring.datasource.url=jdbc:h2:file:./data/userprofiledb
spring.jpa.hibernate.ddl-auto=update
```

Data will be saved in `./data/userprofiledb.mv.db`

## Test the Integration

### 1. Test Backend API

```bash
# Get user dashboard
curl http://localhost:8080/api/users/1/dashboard

# Get all questions
curl http://localhost:8080/api/questions
```

### 2. Start Frontend

```bash
cd login-register
npm start
```

### 3. Test Full Stack

1. Open http://localhost:3000
2. Login with demo credentials
3. Navigate to Dashboard
4. Data should load from H2 database!

## Switching Back to Oracle Later

When you're ready to use Oracle:

1. Start Oracle database
2. Update `application.properties` back to Oracle config
3. Run schema scripts
4. Restart backend

## Comparison

| Feature | H2 | Oracle |
|---------|----|----|
| Installation | None | Required |
| Setup Time | 0 minutes | 30+ minutes |
| Performance | Fast | Very Fast |
| Data Persistence | Optional | Always |
| Production Ready | No | Yes |
| Best For | Development | Production |

## Troubleshooting

### Issue: Tables not created
**Solution:** Check `spring.jpa.hibernate.ddl-auto=create-drop` is set

### Issue: Can't access H2 console
**Solution:** 
- Check backend is running
- URL: http://localhost:8080/api/h2-console (note the `/api` prefix)
- JDBC URL must be: `jdbc:h2:mem:userprofiledb`

### Issue: Data disappears
**Solution:** This is normal for in-memory H2. Use file-based H2 for persistence.

## Summary

**To use H2 database:**

1. ✅ Add H2 dependency to pom.xml
2. ✅ Update application.properties with H2 config
3. ✅ Restart backend
4. ✅ Access H2 console at http://localhost:8080/api/h2-console
5. ✅ Insert sample data
6. ✅ Test APIs
7. ✅ Start frontend
8. ✅ Everything works!

**No Oracle installation needed!** 🎉
