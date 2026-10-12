package com.careercompass.backend.service;

import com.careercompass.backend.entity.SkillItem;
import com.careercompass.backend.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillItem> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<SkillItem> getSkillById(String id) {
        return skillRepository.findById(id);
    }

    @Transactional
    public SkillItem updateSkillLevel(String id, String newLevel) {
        SkillItem skill = skillRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found: " + id));
        skill.setLevel(newLevel);
        return skillRepository.save(skill);
    }
}
