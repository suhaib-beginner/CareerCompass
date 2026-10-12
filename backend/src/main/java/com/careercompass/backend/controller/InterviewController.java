package com.careercompass.backend.controller;

import com.careercompass.backend.dto.StarNotesUpdateDto;
import com.careercompass.backend.entity.BehavioralQuestion;
import com.careercompass.backend.entity.TechnicalTopic;
import com.careercompass.backend.service.InterviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping("/technical")
    public ResponseEntity<List<TechnicalTopic>> getTechnicalTopics() {
        return ResponseEntity.ok(interviewService.getAllTechnicalTopics());
    }

    @GetMapping("/behavioral")
    public ResponseEntity<List<BehavioralQuestion>> getBehavioralQuestions() {
        return ResponseEntity.ok(interviewService.getAllBehavioralQuestions());
    }

    @PutMapping("/behavioral/{id}/notes")
    public ResponseEntity<BehavioralQuestion> updateNotes(@PathVariable String id,
                                                          @RequestBody StarNotesUpdateDto dto) {
        return ResponseEntity.ok(interviewService.updateUserNotes(id, dto.getUserNotes()));
    }
}
