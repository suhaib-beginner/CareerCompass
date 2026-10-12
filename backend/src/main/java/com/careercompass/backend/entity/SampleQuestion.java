package com.careercompass.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "sample_questions")
public class SampleQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String hint;

    @Column(nullable = false, length = 30)
    private String frequency; // 'High', 'Very High', 'Medium'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonIgnore
    private TechnicalTopic topic;

    public SampleQuestion() {
    }

    public SampleQuestion(String question, String hint, String frequency, TechnicalTopic topic) {
        this.question = question;
        this.hint = hint;
        this.frequency = frequency;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public TechnicalTopic getTopic() {
        return topic;
    }

    public void setTopic(TechnicalTopic topic) {
        this.topic = topic;
    }
}
