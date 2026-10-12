package com.careercompass.backend.dto;

import java.util.List;
import java.util.Map;

public class ReadinessAnalyticsDto {
    private int readinessScore;
    private int skillsMasteredCount;
    private int totalSkillsCount;
    private int eligibleCompaniesCount;
    private int totalCompaniesCount;
    private List<SkillGapDto> priorityGaps;
    private Map<String, Double> hoursAllocation;

    public ReadinessAnalyticsDto() {
    }

    public ReadinessAnalyticsDto(int readinessScore, int skillsMasteredCount, int totalSkillsCount,
                                 int eligibleCompaniesCount, int totalCompaniesCount,
                                 List<SkillGapDto> priorityGaps, Map<String, Double> hoursAllocation) {
        this.readinessScore = readinessScore;
        this.skillsMasteredCount = skillsMasteredCount;
        this.totalSkillsCount = totalSkillsCount;
        this.eligibleCompaniesCount = eligibleCompaniesCount;
        this.totalCompaniesCount = totalCompaniesCount;
        this.priorityGaps = priorityGaps;
        this.hoursAllocation = hoursAllocation;
    }

    public int getReadinessScore() {
        return readinessScore;
    }

    public void setReadinessScore(int readinessScore) {
        this.readinessScore = readinessScore;
    }

    public int getSkillsMasteredCount() {
        return skillsMasteredCount;
    }

    public void setSkillsMasteredCount(int skillsMasteredCount) {
        this.skillsMasteredCount = skillsMasteredCount;
    }

    public int getTotalSkillsCount() {
        return totalSkillsCount;
    }

    public void setTotalSkillsCount(int totalSkillsCount) {
        this.totalSkillsCount = totalSkillsCount;
    }

    public int getEligibleCompaniesCount() {
        return eligibleCompaniesCount;
    }

    public void setEligibleCompaniesCount(int eligibleCompaniesCount) {
        this.eligibleCompaniesCount = eligibleCompaniesCount;
    }

    public int getTotalCompaniesCount() {
        return totalCompaniesCount;
    }

    public void setTotalCompaniesCount(int totalCompaniesCount) {
        this.totalCompaniesCount = totalCompaniesCount;
    }

    public List<SkillGapDto> getPriorityGaps() {
        return priorityGaps;
    }

    public void setPriorityGaps(List<SkillGapDto> priorityGaps) {
        this.priorityGaps = priorityGaps;
    }

    public Map<String, Double> getHoursAllocation() {
        return hoursAllocation;
    }

    public void setHoursAllocation(Map<String, Double> hoursAllocation) {
        this.hoursAllocation = hoursAllocation;
    }
}
