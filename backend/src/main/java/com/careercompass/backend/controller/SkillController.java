package com.careercompass.backend.controller;

import com.careercompass.backend.dto.SkillLevelUpdateDto;
import com.careercompass.backend.entity.SkillItem;
import com.careercompass.backend.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillItem>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillItem> getSkillById(@PathVariable String id) {
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/level")
    public ResponseEntity<SkillItem> updateSkillLevel(
            @PathVariable String id,
            @Valid @RequestBody SkillLevelUpdateDto dto) {
        return ResponseEntity.ok(skillService.updateSkillLevel(id, dto.getLevel()));
    }
}
