package com.careercompass.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 150)
    private String branch;

    @Column(name = "current_year", length = 50)
    private String currentYear;

    @Column(nullable = false, precision = 3, scale = 2)
    private BigDecimal cgpa;

    @Column(name = "daily_study_hours", nullable = false)
    private Integer dailyStudyHours;

    @Column(name = "target_package", nullable = false, length = 20)
    private String targetPackage;

    @Column(name = "completed_tasks_count")
    private Integer completedTasksCount = 0;

    @Column(name = "current_streak_days")
    private Integer currentStreakDays = 0;

    public StudentProfile() {
    }

    public StudentProfile(String fullName, String email, String branch, String currentYear,
                          BigDecimal cgpa, Integer dailyStudyHours, String targetPackage,
                          Integer completedTasksCount, Integer currentStreakDays) {
        this.fullName = fullName;
        this.email = email;
        this.branch = branch;
        this.currentYear = currentYear;
        this.cgpa = cgpa;
        this.dailyStudyHours = dailyStudyHours;
        this.targetPackage = targetPackage;
        this.completedTasksCount = completedTasksCount;
        this.currentStreakDays = currentStreakDays;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCurrentYear() {
        return currentYear;
    }

    public void setCurrentYear(String currentYear) {
        this.currentYear = currentYear;
    }

    public BigDecimal getCgpa() {
        return cgpa;
    }

    public void setCgpa(BigDecimal cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getDailyStudyHours() {
        return dailyStudyHours;
    }

    public void setDailyStudyHours(Integer dailyStudyHours) {
        this.dailyStudyHours = dailyStudyHours;
    }

    public String getTargetPackage() {
        return targetPackage;
    }

    public void setTargetPackage(String targetPackage) {
        this.targetPackage = targetPackage;
    }

    public Integer getCompletedTasksCount() {
        return completedTasksCount;
    }

    public void setCompletedTasksCount(Integer completedTasksCount) {
        this.completedTasksCount = completedTasksCount;
    }

    public Integer getCurrentStreakDays() {
        return currentStreakDays;
    }

    public void setCurrentStreakDays(Integer currentStreakDays) {
        this.currentStreakDays = currentStreakDays;
    }
}
