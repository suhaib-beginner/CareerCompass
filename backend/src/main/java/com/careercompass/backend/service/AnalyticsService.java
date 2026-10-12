package com.careercompass.backend.service;

import com.careercompass.backend.dto.ReadinessAnalyticsDto;
import com.careercompass.backend.dto.SkillGapDto;
import com.careercompass.backend.entity.Company;
import com.careercompass.backend.entity.SkillItem;
import com.careercompass.backend.entity.StudentProfile;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class AnalyticsService {

    private final StudentProfileService profileService;
    private final SkillService skillService;
    private final CompanyService companyService;

    private static final Map<String, Integer> LEVEL_NUMERIC = Map.of(
            "Unexplored", 0,
            "Beginner", 1,
            "Intermediate", 2,
            "Advanced", 3
    );

    public AnalyticsService(StudentProfileService profileService,
                            SkillService skillService,
                            CompanyService companyService) {
        this.profileService = profileService;
        this.skillService = skillService;
        this.companyService = companyService;
    }

    public ReadinessAnalyticsDto getReadinessAnalytics() {
        StudentProfile profile = profileService.getActiveProfile();
        List<SkillItem> skills = skillService.getAllSkills();
        List<Company> companies = companyService.getAllCompanies();

        String targetPkg = profile.getTargetPackage() != null ? profile.getTargetPackage() : "15 LPA";
        int totalSkills = skills.size();
        int masteredCount = 0;
        double levelDeficitSum = 0.0;
        List<SkillGapDto> priorityGaps = new ArrayList<>();

        for (SkillItem skill : skills) {
            String current = skill.getLevel() != null ? skill.getLevel() : "Unexplored";
            String required = getRequiredLevel(skill, targetPkg);

            int currentVal = LEVEL_NUMERIC.getOrDefault(current, 0);
            int reqVal = LEVEL_NUMERIC.getOrDefault(required, 2);

            if (currentVal >= reqVal && currentVal > 0) {
                masteredCount++;
            }

            if (currentVal < reqVal) {
                int deficit = reqVal - currentVal;
                levelDeficitSum += deficit;
                String severity = deficit >= 2 ? "High" : deficit == 1 ? "Medium" : "Low";
                priorityGaps.add(new SkillGapDto(skill, current, required, severity));
            }
        }

        // Sort priority gaps by High -> Medium -> Low
        priorityGaps.sort((a, b) -> {
            int valA = "High".equals(a.getGapSeverity()) ? 3 : "Medium".equals(a.getGapSeverity()) ? 2 : 1;
            int valB = "High".equals(b.getGapSeverity()) ? 3 : "Medium".equals(b.getGapSeverity()) ? 2 : 1;
            return Integer.compare(valB, valA);
        });

        // Readiness Score Calculation
        // Base score = mastered ratio (60%) + CGPA factor (20%) + deficit penalty
        double masteredRatio = totalSkills > 0 ? (double) masteredCount / totalSkills : 0;
        double cgpa = profile.getCgpa() != null ? profile.getCgpa().doubleValue() : 8.0;
        double cgpaFactor = Math.min(1.0, cgpa / 10.0);

        int score = (int) Math.round((masteredRatio * 65.0) + (cgpaFactor * 25.0) + 10.0);
        score = Math.max(15, Math.min(98, score));

        // Eligible Companies Count
        BigDecimal studentCgpa = profile.getCgpa() != null ? profile.getCgpa() : BigDecimal.valueOf(8.0);
        int eligibleCount = (int) companies.stream()
                .filter(c -> studentCgpa.compareTo(c.getMinCgpa()) >= 0)
                .count();

        // Hours Allocation
        int totalDailyHours = profile.getDailyStudyHours() != null ? profile.getDailyStudyHours() : 4;
        Map<String, Double> hoursAllocation = new LinkedHashMap<>();
        hoursAllocation.put("dsaHours", roundOneDecimal(totalDailyHours * 0.40));
        hoursAllocation.put("aptitudeHours", roundOneDecimal(totalDailyHours * 0.20));
        hoursAllocation.put("projectHours", roundOneDecimal(totalDailyHours * 0.25));
        hoursAllocation.put("communicationHours", roundOneDecimal(totalDailyHours * 0.15));

        return new ReadinessAnalyticsDto(
                score,
                masteredCount,
                totalSkills,
                eligibleCount,
                companies.size(),
                priorityGaps,
                hoursAllocation
        );
    }

    private String getRequiredLevel(SkillItem skill, String targetPkg) {
        if ("20 LPA".equalsIgnoreCase(targetPkg)) {
            return skill.getRequiredFor20Lpa();
        } else if ("10 LPA".equalsIgnoreCase(targetPkg)) {
            return skill.getRequiredFor10Lpa();
        }
        return skill.getRequiredFor15Lpa();
    }

    private double roundOneDecimal(double val) {
        return Math.round(val * 10.0) / 10.0;
    }
}
