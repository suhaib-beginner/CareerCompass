package com.careercompass.backend.repository;

import com.careercompass.backend.entity.BehavioralQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BehavioralQuestionRepository extends JpaRepository<BehavioralQuestion, String> {
    List<BehavioralQuestion> findByCompetency(String competency);
}
