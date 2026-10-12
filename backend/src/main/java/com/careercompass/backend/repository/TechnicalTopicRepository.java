package com.careercompass.backend.repository;

import com.careercompass.backend.entity.TechnicalTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnicalTopicRepository extends JpaRepository<TechnicalTopic, String> {
    List<TechnicalTopic> findByCategory(String category);
}
