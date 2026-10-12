package com.careercompass.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "planner_tasks")
public class PlannerTask {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 50)
    private String domain; // 'DSA', 'Aptitude', 'Projects', 'Communication'

    @Column(nullable = false)
    private String title;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(nullable = false, length = 20)
    private String priority; // 'High', 'Medium', 'Low'

    @Column(name = "due_time", length = 50)
    private String dueTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public PlannerTask() {
    }

    public PlannerTask(String id, String domain, String title, Integer durationMinutes,
                       Boolean completed, String priority, String dueTime) {
        this.id = id;
        this.domain = domain;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.completed = completed != null ? completed : false;
        this.priority = priority;
        this.dueTime = dueTime;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDueTime() {
        return dueTime;
    }

    public void setDueTime(String dueTime) {
        this.dueTime = dueTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
