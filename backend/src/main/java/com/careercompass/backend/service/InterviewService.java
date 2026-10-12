package com.careercompass.backend.service;

import com.careercompass.backend.entity.BehavioralQuestion;
import com.careercompass.backend.entity.TechnicalTopic;
import com.careercompass.backend.repository.BehavioralQuestionRepository;
import com.careercompass.backend.repository.TechnicalTopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InterviewService {

    private final TechnicalTopicRepository topicRepository;
    private final BehavioralQuestionRepository behavioralRepository;

    public InterviewService(TechnicalTopicRepository topicRepository,
                            BehavioralQuestionRepository behavioralRepository) {
        this.topicRepository = topicRepository;
        this.behavioralRepository = behavioralRepository;
    }

    public List<TechnicalTopic> getAllTechnicalTopics() {
        return topicRepository.findAll();
    }

    public List<BehavioralQuestion> getAllBehavioralQuestions() {
        return behavioralRepository.findAll();
    }

    @Transactional
    public BehavioralQuestion updateUserNotes(String questionId, String notes) {
        BehavioralQuestion question = behavioralRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found: " + questionId));
        question.setUserNotes(notes);
        return behavioralRepository.save(question);
    }
}
