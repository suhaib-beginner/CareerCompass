-- =========================================================================
-- CareerCompass MySQL Database Schema
-- Database: careercompass_db
-- =========================================================================

CREATE DATABASE IF NOT EXISTS careercompass_db;
USE careercompass_db;

-- 1. Student Profiles
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    branch VARCHAR(150) NOT NULL,
    current_year VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    daily_study_hours INT NOT NULL,
    target_package VARCHAR(20) NOT NULL,
    completed_tasks_count INT DEFAULT 0,
    current_streak_days INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Skills Catalog
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    current_level VARCHAR(30) NOT NULL,
    required_10_lpa VARCHAR(30) NOT NULL,
    required_15_lpa VARCHAR(30) NOT NULL,
    required_20_lpa VARCHAR(30) NOT NULL,
    description TEXT,
    practice_count INT DEFAULT 0,
    recommended_hours INT DEFAULT 10
);

-- 3. Companies & Recruiting Rounds
CREATE TABLE IF NOT EXISTS companies (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    ctc_bracket VARCHAR(50) NOT NULL,
    min_cgpa DECIMAL(3,2) NOT NULL,
    location VARCHAR(100) NOT NULL,
    hiring_type VARCHAR(50) NOT NULL,
    deadline_date VARCHAR(50) NOT NULL,
    days_remaining INT NOT NULL,
    logo_initial VARCHAR(5) NOT NULL,
    accent_color VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS company_stages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id VARCHAR(50) NOT NULL,
    stage_number INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_skills (
    company_id VARCHAR(50) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (company_id, skill_name),
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- 4. Daily Planner Tasks
CREATE TABLE IF NOT EXISTS planner_tasks (
    id VARCHAR(50) PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) NOT NULL,
    due_time VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Technical Question Topics & Questions
CREATE TABLE IF NOT EXISTS technical_topics (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    core_concepts TEXT
);

CREATE TABLE IF NOT EXISTS sample_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    hint TEXT NOT NULL,
    frequency VARCHAR(30) NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES technical_topics(id) ON DELETE CASCADE
);

-- 6. Behavioral STAR Hub
CREATE TABLE IF NOT EXISTS behavioral_questions (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    competency VARCHAR(100) NOT NULL,
    star_situation TEXT NOT NULL,
    star_task TEXT NOT NULL,
    star_action TEXT NOT NULL,
    star_result TEXT NOT NULL,
    sample_answer TEXT NOT NULL,
    user_notes TEXT
);
