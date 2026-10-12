package com.careercompass.backend.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "technical_topics")
public class TechnicalTopic {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 50)
    private String category; // 'DSA', 'System Design', 'Core CS'

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 20)
    private String difficulty; // 'Easy', 'Medium', 'Hard'

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "topic_core_concepts", joinColumns = @JoinColumn(name = "topic_id"))
    @Column(name = "concept")
    private List<String> coreConcepts = new ArrayList<>();

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SampleQuestion> sampleQuestions = new ArrayList<>();

    public TechnicalTopic() {
    }

    public TechnicalTopic(String id, String category, String title, String difficulty, String description) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.difficulty = difficulty;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getCoreConcepts() {
        return coreConcepts;
    }

    public void setCoreConcepts(List<String> coreConcepts) {
        this.coreConcepts = coreConcepts;
    }

    public List<SampleQuestion> getSampleQuestions() {
        return sampleQuestions;
    }

    public void setSampleQuestions(List<SampleQuestion> sampleQuestions) {
        this.sampleQuestions = sampleQuestions;
    }
}
