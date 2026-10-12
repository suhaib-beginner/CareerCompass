package com.careercompass.backend.service;

import com.careercompass.backend.entity.Company;
import com.careercompass.backend.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Optional<Company> getCompanyById(String id) {
        return companyRepository.findById(id);
    }

    public List<Company> getEligibleCompanies(BigDecimal cgpa) {
        return companyRepository.findByMinCgpaLessThanEqual(cgpa);
    }
}
