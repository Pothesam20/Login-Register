-- Sample data for testing User Profile Dashboard

-- Insert sample user profile
INSERT INTO USER_PROFILE (USER_ID, FULL_NAME, ROLE, EMAIL, LOCATION, WEBSITE, BIO, PROFILE_IMAGE, COVER_IMAGE, CREATED_AT)
VALUES (
    USER_PROFILE_SEQ.NEXTVAL,
    'John Doe',
    'Software Developer',
    'john.doe@example.com',
    'New York, USA',
    'www.johndoe.com',
    'Passionate developer with expertise in modern web technologies. Love building scalable applications and learning new frameworks.',
    'https://example.com/profile.jpg',
    'https://example.com/cover.jpg',
    CURRENT_TIMESTAMP
);

-- Insert user stats for the sample user
INSERT INTO USER_STATS (USER_ID, POSTS, FOLLOWERS, FOLLOWING)
VALUES (1, 245, 1289, 456);

-- Insert sample posts
INSERT INTO USER_POSTS (POST_ID, USER_ID, CONTENT, POST_TYPE, CREATED_AT)
VALUES (
    USER_POST_SEQ.NEXTVAL,
    1,
    'Just completed an amazing project using React and Node.js! The journey was challenging but incredibly rewarding. 🚀',
    'TEXT',
    CURRENT_TIMESTAMP
);

INSERT INTO USER_POSTS (POST_ID, USER_ID, CONTENT, POST_TYPE, CREATED_AT)
VALUES (
    USER_POST_SEQ.NEXTVAL,
    1,
    'Excited to share my latest article on microservices architecture. Check it out!',
    'ARTICLE',
    CURRENT_TIMESTAMP - INTERVAL '2' HOUR
);

INSERT INTO USER_POSTS (POST_ID, USER_ID, CONTENT, POST_TYPE, CREATED_AT)
VALUES (
    USER_POST_SEQ.NEXTVAL,
    1,
    'Beautiful sunset from my office window today. Sometimes we need to pause and appreciate the little things.',
    'IMAGE',
    CURRENT_TIMESTAMP - INTERVAL '5' HOUR
);

-- Commit the changes
COMMIT;
