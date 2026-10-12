package com.careercompass.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String industry;

    @Column(nullable = false, length = 100)
    private String role;

    @Column(name = "ctc_bracket", nullable = false, length = 50)
    private String ctcBracket;

    @Column(name = "min_cgpa", nullable = false, precision = 3, scale = 2)
    private BigDecimal minCgpa;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(name = "hiring_type", nullable = false, length = 50)
    private String hiringType;

    @Column(name = "deadline_date", nullable = false, length = 50)
    private String deadlineDate;

    @Column(name = "days_remaining", nullable = false)
    private Integer daysRemaining;

    @Column(name = "logo_initial", nullable = false, length = 5)
    private String logoInitial;

    @Column(name = "accent_color", nullable = false, length = 20)
    private String accentColor;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "company_skills", joinColumns = @JoinColumn(name = "company_id"))
    @Column(name = "skill_name")
    private List<String> keySkills = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CompanyStage> interviewStages = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CompanyResource> resources = new ArrayList<>();

    public Company() {
    }

    public Company(String id, String name, String industry, String role, String ctcBracket,
                   BigDecimal minCgpa, String location, String hiringType, String deadlineDate,
                   Integer daysRemaining, String logoInitial, String accentColor) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.role = role;
        this.ctcBracket = ctcBracket;
        this.minCgpa = minCgpa;
        this.location = location;
        this.hiringType = hiringType;
        this.deadlineDate = deadlineDate;
        this.daysRemaining = daysRemaining;
        this.logoInitial = logoInitial;
        this.accentColor = accentColor;
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

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCtcBracket() {
        return ctcBracket;
    }

    public void setCtcBracket(String ctcBracket) {
        this.ctcBracket = ctcBracket;
    }

    public BigDecimal getMinCgpa() {
        return minCgpa;
    }

    public void setMinCgpa(BigDecimal minCgpa) {
        this.minCgpa = minCgpa;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHiringType() {
        return hiringType;
    }

    public void setHiringType(String hiringType) {
        this.hiringType = hiringType;
    }

    public String getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(String deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public Integer getDaysRemaining() {
        return daysRemaining;
    }

    public void setDaysRemaining(Integer daysRemaining) {
        this.daysRemaining = daysRemaining;
    }

    public String getLogoInitial() {
        return logoInitial;
    }

    public void setLogoInitial(String logoInitial) {
        this.logoInitial = logoInitial;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public List<String> getKeySkills() {
        return keySkills;
    }

    public void setKeySkills(List<String> keySkills) {
        this.keySkills = keySkills;
    }

    public List<CompanyStage> getInterviewStages() {
        return interviewStages;
    }

    public void setInterviewStages(List<CompanyStage> interviewStages) {
        this.interviewStages = interviewStages;
    }

    public List<CompanyResource> getResources() {
        return resources;
    }

    public void setResources(List<CompanyResource> resources) {
        this.resources = resources;
    }
}
