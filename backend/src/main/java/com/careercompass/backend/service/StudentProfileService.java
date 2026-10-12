package com.careercompass.backend.service;

import com.careercompass.backend.entity.StudentProfile;
import com.careercompass.backend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class StudentProfileService {

    private final StudentProfileRepository profileRepository;

    public StudentProfileService(StudentProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public StudentProfile getActiveProfile() {
        return profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(() -> {
                    StudentProfile defaultProfile = new StudentProfile(
                            "Arjun Sharma",
                            "arjun.sharma@forge.edu",
                            "Computer Science & Engineering",
                            "3rd Year",
                            new BigDecimal("8.35"),
                            4,
                            "15 LPA",
                            18,
                            12
                    );
                    return profileRepository.save(defaultProfile);
                });
    }

    @Transactional
    public StudentProfile updateProfile(StudentProfile updates) {
        StudentProfile current = getActiveProfile();
        if (updates.getFullName() != null) current.setFullName(updates.getFullName());
        if (updates.getEmail() != null) current.setEmail(updates.getEmail());
        if (updates.getBranch() != null) current.setBranch(updates.getBranch());
        if (updates.getCurrentYear() != null) current.setCurrentYear(updates.getCurrentYear());
        if (updates.getCgpa() != null) current.setCgpa(updates.getCgpa());
        if (updates.getDailyStudyHours() != null) current.setDailyStudyHours(updates.getDailyStudyHours());
        if (updates.getTargetPackage() != null) current.setTargetPackage(updates.getTargetPackage());
        if (updates.getCompletedTasksCount() != null) current.setCompletedTasksCount(updates.getCompletedTasksCount());
        if (updates.getCurrentStreakDays() != null) current.setCurrentStreakDays(updates.getCurrentStreakDays());
        return profileRepository.save(current);
    }
}
