-- ============================================
-- Login Register Backend - Oracle Database Setup Script
-- ============================================

-- ============================================
-- 1. Create Sequence for User ID
-- ============================================
CREATE SEQUENCE USER_SEQ
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- ============================================
-- 2. Create USERS Table
-- ============================================
CREATE TABLE USERS (
    ID              NUMBER PRIMARY KEY REFERENCES USER_SEQ,
    USERNAME        VARCHAR2(100) NOT NULL UNIQUE,
    PASSWORD        VARCHAR2(255) NOT NULL,
    PHONE_NUMBER    VARCHAR2(20),
    DATE_OF_BIRTH   DATE,
    FAVORITE_COLOR  VARCHAR2(100),
    NICK_NAME       VARCHAR2(100),
    PET_NAME        VARCHAR2(100),
    ROLE            VARCHAR2(50) DEFAULT 'USER',
    CREATED_AT      TIMESTAMP DEFAULT SYSTIMESTAMP,
    UPDATED_AT      TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- ============================================
-- 3. Create Indexes
-- ============================================
CREATE INDEX idx_username ON USERS(USERNAME);
CREATE INDEX idx_created_at ON USERS(CREATED_AT);

-- ============================================
-- 4. Create Triggers for Audit
-- ============================================
CREATE OR REPLACE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON USERS
FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

-- ============================================
-- 5. Grant Privileges (if using separate user)
-- ============================================
-- GRANT CREATE SESSION TO auth_user;
-- GRANT CREATE TABLE TO auth_user;
-- GRANT CREATE SEQUENCE TO auth_user;
-- GRANT CREATE TRIGGER TO auth_user;

-- ============================================
-- 6. Sample Insert (Optional)
-- ============================================
-- INSERT INTO USERS (ID, USERNAME, PASSWORD, PHONE_NUMBER, DATE_OF_BIRTH, FAVORITE_COLOR, NICK_NAME, PET_NAME, ROLE)
-- VALUES (USER_SEQ.NEXTVAL, 'admin', '$2a$10$...', '1234567890', TO_DATE('1990-01-01', 'YYYY-MM-DD'), 'Blue', 'Admin', 'Dog', 'ADMIN');

-- ============================================
-- 7. Verify Table Creation
-- ============================================
-- SELECT * FROM USERS;
-- SELECT * FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'USER_SEQ';

COMMIT;
