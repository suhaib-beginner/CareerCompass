package com.careercompass.backend.controller;

import com.careercompass.backend.dto.TaskRequestDto;
import com.careercompass.backend.entity.PlannerTask;
import com.careercompass.backend.service.PlannerTaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class PlannerTaskController {

    private final PlannerTaskService taskService;

    public PlannerTaskController(PlannerTaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<PlannerTask>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<PlannerTask> createTask(@Valid @RequestBody TaskRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<PlannerTask> toggleTask(@PathVariable String id) {
        return ResponseEntity.ok(taskService.toggleTask(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
