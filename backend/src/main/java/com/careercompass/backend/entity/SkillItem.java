package com.careercompass.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class SkillItem {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category; // 'Languages', 'Core CS', 'Problem Solving', 'Development'

    @Column(name = "current_level", nullable = false, length = 30)
    private String level; // 'Unexplored', 'Beginner', 'Intermediate', 'Advanced'

    @Column(name = "required_10_lpa", nullable = false, length = 30)
    private String requiredFor10Lpa;

    @Column(name = "required_15_lpa", nullable = false, length = 30)
    private String requiredFor15Lpa;

    @Column(name = "required_20_lpa", nullable = false, length = 30)
    private String requiredFor20Lpa;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "practice_count")
    private Integer practiceCount = 0;

    @Column(name = "recommended_hours")
    private Integer recommendedHours = 10;

    public SkillItem() {
    }

    public SkillItem(String id, String name, String category, String level,
                     String requiredFor10Lpa, String requiredFor15Lpa, String requiredFor20Lpa,
                     String description, Integer practiceCount, Integer recommendedHours) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
        this.requiredFor10Lpa = requiredFor10Lpa;
        this.requiredFor15Lpa = requiredFor15Lpa;
        this.requiredFor20Lpa = requiredFor20Lpa;
        this.description = description;
        this.practiceCount = practiceCount;
        this.recommendedHours = recommendedHours;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getRequiredFor10Lpa() {
        return requiredFor10Lpa;
    }

    public void setRequiredFor10Lpa(String requiredFor10Lpa) {
        this.requiredFor10Lpa = requiredFor10Lpa;
    }

    public String getRequiredFor15Lpa() {
        return requiredFor15Lpa;
    }

    public void setRequiredFor15Lpa(String requiredFor15Lpa) {
        this.requiredFor15Lpa = requiredFor15Lpa;
    }

    public String getRequiredFor20Lpa() {
        return requiredFor20Lpa;
    }

    public void setRequiredFor20Lpa(String requiredFor20Lpa) {
        this.requiredFor20Lpa = requiredFor20Lpa;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPracticeCount() {
        return practiceCount;
    }

    public void setPracticeCount(Integer practiceCount) {
        this.practiceCount = practiceCount;
    }

    public Integer getRecommendedHours() {
        return recommendedHours;
    }

    public void setRecommendedHours(Integer recommendedHours) {
        this.recommendedHours = recommendedHours;
    }
}
