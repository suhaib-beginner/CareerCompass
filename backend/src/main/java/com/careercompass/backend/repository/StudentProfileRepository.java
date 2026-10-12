package com.careercompass.backend.repository;

import com.careercompass.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByEmail(String email);
    Optional<StudentProfile> findFirstByOrderByIdAsc();
}
