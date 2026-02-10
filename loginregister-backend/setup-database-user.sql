-- ============================================
-- Oracle Database User Setup Script
-- Run this as SYSDBA: sqlplus / as sysdba
-- ============================================

-- Connect as SYSDBA (if not already connected)
CONNECT / AS SYSDBA;

-- Drop user if exists (optional - for clean setup)
-- Uncomment the following line if you want to recreate the user
-- DROP USER userprofile CASCADE;

-- Create application user
CREATE USER userprofile IDENTIFIED BY UserProfile123;

-- Grant connection privileges
GRANT CONNECT TO userprofile;
GRANT RESOURCE TO userprofile;
GRANT CREATE SESSION TO userprofile;

-- Grant object privileges
GRANT CREATE TABLE TO userprofile;
GRANT CREATE SEQUENCE TO userprofile;
GRANT CREATE VIEW TO userprofile;
GRANT CREATE PROCEDURE TO userprofile;
GRANT CREATE TRIGGER TO userprofile;

-- Grant tablespace quota
GRANT UNLIMITED TABLESPACE TO userprofile;

-- Verify user creation
SELECT username, account_status, created 
FROM dba_users 
WHERE username = 'USERPROFILE';

-- Display granted privileges
SELECT * FROM dba_sys_privs WHERE grantee = 'USERPROFILE';

PROMPT
PROMPT ============================================
PROMPT User 'userprofile' created successfully!
PROMPT Password: UserProfile123
PROMPT ============================================
PROMPT
PROMPT Next steps:
PROMPT 1. Connect as userprofile user
PROMPT 2. Run schema.sql to create tables
PROMPT 3. Run sample-data.sql to load test data
PROMPT ============================================

EXIT;
