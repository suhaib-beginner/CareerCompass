package com.careercompass.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillLevelUpdateDto {

    @NotBlank(message = "Level is required")
    private String level;

    public SkillLevelUpdateDto() {
    }

    public SkillLevelUpdateDto(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
