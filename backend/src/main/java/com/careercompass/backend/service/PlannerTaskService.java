package com.careercompass.backend.service;

import com.careercompass.backend.dto.TaskRequestDto;
import com.careercompass.backend.entity.PlannerTask;
import com.careercompass.backend.entity.StudentProfile;
import com.careercompass.backend.repository.PlannerTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PlannerTaskService {

    private final PlannerTaskRepository taskRepository;
    private final StudentProfileService profileService;

    public PlannerTaskService(PlannerTaskRepository taskRepository, StudentProfileService profileService) {
        this.taskRepository = taskRepository;
        this.profileService = profileService;
    }

    public List<PlannerTask> getAllTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public PlannerTask createTask(TaskRequestDto dto) {
        String id = "task-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4);
        PlannerTask task = new PlannerTask(
                id,
                dto.getDomain(),
                dto.getTitle(),
                dto.getDurationMinutes(),
                false,
                dto.getPriority(),
                dto.getDueTime() != null ? dto.getDueTime() : "Today"
        );
        return taskRepository.save(task);
    }

    @Transactional
    public PlannerTask toggleTask(String taskId) {
        PlannerTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found: " + taskId));
        boolean newState = !task.getCompleted();
        task.setCompleted(newState);

        // Update profile streak and completed tasks
        StudentProfile profile = profileService.getActiveProfile();
        int currentCount = profile.getCompletedTasksCount() != null ? profile.getCompletedTasksCount() : 0;
        if (newState) {
            profile.setCompletedTasksCount(currentCount + 1);
        } else {
            profile.setCompletedTasksCount(Math.max(0, currentCount - 1));
        }
        profileService.updateProfile(profile);

        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(String taskId) {
        taskRepository.deleteById(taskId);
    }
}
