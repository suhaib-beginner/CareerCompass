package com.careercompass.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TaskRequestDto {

    @NotBlank(message = "Domain is required")
    private String domain;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Duration is required")
    private Integer durationMinutes;

    @NotBlank(message = "Priority is required")
    private String priority;

    private String dueTime;

    public TaskRequestDto() {
    }

    public TaskRequestDto(String domain, String title, Integer durationMinutes, String priority, String dueTime) {
        this.domain = domain;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.priority = priority;
        this.dueTime = dueTime;
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
}
