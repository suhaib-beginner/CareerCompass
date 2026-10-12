package com.careercompass.backend.dto;

import com.careercompass.backend.entity.SkillItem;

public class SkillGapDto {
    private SkillItem skill;
    private String current;
    private String required;
    private String gapSeverity; // 'High', 'Medium', 'Low'

    public SkillGapDto() {
    }

    public SkillGapDto(SkillItem skill, String current, String required, String gapSeverity) {
        this.skill = skill;
        this.current = current;
        this.required = required;
        this.gapSeverity = gapSeverity;
    }

    public SkillItem getSkill() {
        return skill;
    }

    public void setSkill(SkillItem skill) {
        this.skill = skill;
    }

    public String getCurrent() {
        return current;
    }

    public void setCurrent(String current) {
        this.current = current;
    }

    public String getRequired() {
        return required;
    }

    public void setRequired(String required) {
        this.required = required;
    }

    public String getGapSeverity() {
        return gapSeverity;
    }

    public void setGapSeverity(String gapSeverity) {
        this.gapSeverity = gapSeverity;
    }
}
