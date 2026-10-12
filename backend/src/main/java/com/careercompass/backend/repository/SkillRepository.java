package com.careercompass.backend.repository;

import com.careercompass.backend.entity.SkillItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<SkillItem, String> {
    List<SkillItem> findByCategory(String category);
}
