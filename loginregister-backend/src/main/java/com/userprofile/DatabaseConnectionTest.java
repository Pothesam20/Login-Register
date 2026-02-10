package com.userprofile;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;

/**
 * Database Connection Test Utility
 * 
 * This is a configuration class that adds a database connection test
 * when the application starts with the 'test' profile.
 * 
 * To enable this test, run:
 * mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=test
 * 
 * Or add to application.properties:
 * spring.profiles.active=test
 */
@Configuration
public class DatabaseConnectionTest {

    @Bean
    @Profile("test")
    public CommandLineRunner testDatabaseConnection(DataSource dataSource) {
        return args -> {
            System.out.println("\n" + "=".repeat(80));
            System.out.println("DATABASE CONNECTION TEST");
            System.out.println("=".repeat(80) + "\n");

            try (Connection connection = dataSource.getConnection()) {
                DatabaseMetaData metaData = connection.getMetaData();

                System.out.println("✅ DATABASE CONNECTION SUCCESSFUL!\n");
                
                System.out.println("Connection Details:");
                System.out.println("  Database Product: " + metaData.getDatabaseProductName());
                System.out.println("  Database Version: " + metaData.getDatabaseProductVersion());
                System.out.println("  Driver Name: " + metaData.getDriverName());
                System.out.println("  Driver Version: " + metaData.getDriverVersion());
                System.out.println("  URL: " + metaData.getURL());
                System.out.println("  Username: " + metaData.getUserName());
                System.out.println("  Catalog: " + connection.getCatalog());
                System.out.println("  Schema: " + connection.getSchema());
                System.out.println("  Auto Commit: " + connection.getAutoCommit());
                System.out.println("  Read Only: " + connection.isReadOnly());
                System.out.println("  Transaction Isolation: " + getTransactionIsolationName(connection.getTransactionIsolation()));

                System.out.println("\nChecking Tables:");
                System.out.println("-".repeat(80));
                
                String[] tableNames = {
                    "USER_PROFILE", "USER_STATS", "USER_POSTS", 
                    "QUESTIONS", "ANSWERS"
                };
                
                int tablesFound = 0;
                for (String tableName : tableNames) {
                    if (tableExists(connection, tableName)) {
                        long count = getTableCount(connection, tableName);
                        System.out.println("  ✅ " + tableName + " (Records: " + count + ")");
                        tablesFound++;
                    } else {
                        System.out.println("  ❌ " + tableName + " (NOT FOUND)");
                    }
                }

                System.out.println("\nChecking Sequences:");
                System.out.println("-".repeat(80));
                
                String[] sequenceNames = {
                    "USER_PROFILE_SEQ", "USER_POST_SEQ", 
                    "QUESTION_SEQ", "ANSWER_SEQ"
                };
                
                int sequencesFound = 0;
                for (String seqName : sequenceNames) {
                    if (sequenceExists(connection, seqName)) {
                        System.out.println("  ✅ " + seqName);
                        sequencesFound++;
                    } else {
                        System.out.println("  ❌ " + seqName + " (NOT FOUND)");
                    }
                }

                System.out.println("\n" + "=".repeat(80));
                System.out.println("TEST SUMMARY");
                System.out.println("=".repeat(80));
                System.out.println("  Connection: ✅ SUCCESS");
                System.out.println("  Tables Found: " + tablesFound + "/" + tableNames.length);
                System.out.println("  Sequences Found: " + sequencesFound + "/" + sequenceNames.length);
                
                if (tablesFound == 0) {
                    System.out.println("\n⚠️  WARNING: No tables found!");
                    System.out.println("   Please run the schema scripts:");
                    System.out.println("   1. src/main/resources/db/schema.sql");
                    System.out.println("   2. src/main/resources/db/questions-answers-schema.sql");
                } else if (tablesFound < tableNames.length) {
                    System.out.println("\n⚠️  WARNING: Some tables are missing!");
                    System.out.println("   Please check and run all schema scripts.");
                } else {
                    System.out.println("\n✅ All tables and sequences are present!");
                    System.out.println("   Your database is ready to use.");
                }
                
                System.out.println("=".repeat(80) + "\n");

            } catch (Exception e) {
                System.err.println("\n❌ DATABASE CONNECTION FAILED!\n");
                System.err.println("Error Details:");
                System.err.println("  Type: " + e.getClass().getSimpleName());
                System.err.println("  Message: " + e.getMessage());
                
                System.err.println("\nCommon Solutions:");
                System.err.println("  1. Check if Oracle database is running");
                System.err.println("  2. Verify credentials in application.properties");
                System.err.println("  3. Check connection URL format");
                System.err.println("  4. Ensure user has proper privileges");
                System.err.println("  5. Test connection with SQL*Plus first");
                
                System.err.println("\n" + "=".repeat(80) + "\n");
                e.printStackTrace();
            }
        };
    }

    private boolean tableExists(Connection connection, String tableName) {
        try (ResultSet rs = connection.getMetaData().getTables(null, null, tableName, new String[]{"TABLE"})) {
            return rs.next();
        } catch (Exception e) {
            return false;
        }
    }

    private long getTableCount(Connection connection, String tableName) {
        try (var stmt = connection.createStatement();
             var rs = stmt.executeQuery("SELECT COUNT(*) FROM " + tableName)) {
            if (rs.next()) {
                return rs.getLong(1);
            }
        } catch (Exception e) {
            // Table might not exist or no access
        }
        return 0;
    }

    private boolean sequenceExists(Connection connection, String sequenceName) {
        try (var stmt = connection.createStatement();
             var rs = stmt.executeQuery("SELECT sequence_name FROM user_sequences WHERE sequence_name = '" + sequenceName + "'")) {
            return rs.next();
        } catch (Exception e) {
            return false;
        }
    }

    private String getTransactionIsolationName(int level) {
        switch (level) {
            case Connection.TRANSACTION_NONE: return "NONE";
            case Connection.TRANSACTION_READ_UNCOMMITTED: return "READ_UNCOMMITTED";
            case Connection.TRANSACTION_READ_COMMITTED: return "READ_COMMITTED";
            case Connection.TRANSACTION_REPEATABLE_READ: return "REPEATABLE_READ";
            case Connection.TRANSACTION_SERIALIZABLE: return "SERIALIZABLE";
            default: return "UNKNOWN (" + level + ")";
        }
    }
}
