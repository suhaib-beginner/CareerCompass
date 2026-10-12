package com.careercompass.backend.repository;

import com.careercompass.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    List<Company> findByIndustry(String industry);
    List<Company> findByMinCgpaLessThanEqual(BigDecimal cgpa);
}
