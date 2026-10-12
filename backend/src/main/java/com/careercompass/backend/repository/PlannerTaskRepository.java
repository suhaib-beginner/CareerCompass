package com.careercompass.backend.repository;

import com.careercompass.backend.entity.PlannerTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlannerTaskRepository extends JpaRepository<PlannerTask, String> {
    List<PlannerTask> findByDomain(String domain);
    List<PlannerTask> findByCompleted(Boolean completed);
    List<PlannerTask> findAllByOrderByCreatedAtDesc();
}
