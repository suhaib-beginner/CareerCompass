package com.careercompass.backend.controller;

import com.careercompass.backend.entity.StudentProfile;
import com.careercompass.backend.service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final StudentProfileService profileService;

    public ProfileController(StudentProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<StudentProfile> getProfile() {
        return ResponseEntity.ok(profileService.getActiveProfile());
    }

    @PutMapping
    public ResponseEntity<StudentProfile> updateProfile(@RequestBody StudentProfile updates) {
        return ResponseEntity.ok(profileService.updateProfile(updates));
    }
}
