package com.careercompass.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "behavioral_questions")
public class BehavioralQuestion {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false, length = 100)
    private String competency;

    @Column(name = "star_situation", nullable = false, columnDefinition = "TEXT")
    private String situation;

    @Column(name = "star_task", nullable = false, columnDefinition = "TEXT")
    private String task;

    @Column(name = "star_action", nullable = false, columnDefinition = "TEXT")
    private String action;

    @Column(name = "star_result", nullable = false, columnDefinition = "TEXT")
    private String result;

    @Column(name = "sample_answer", nullable = false, columnDefinition = "TEXT")
    private String sampleAnswer;

    @Column(name = "user_notes", columnDefinition = "TEXT")
    private String userNotes;

    public BehavioralQuestion() {
    }

    public BehavioralQuestion(String id, String question, String competency, String situation,
                              String task, String action, String result, String sampleAnswer, String userNotes) {
        this.id = id;
        this.question = question;
        this.competency = competency;
        this.situation = situation;
        this.task = task;
        this.action = action;
        this.result = result;
        this.sampleAnswer = sampleAnswer;
        this.userNotes = userNotes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCompetency() {
        return competency;
    }

    public void setCompetency(String competency) {
        this.competency = competency;
    }

    public String getSituation() {
        return situation;
    }

    public void setSituation(String situation) {
        this.situation = situation;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getSampleAnswer() {
        return sampleAnswer;
    }

    public void setSampleAnswer(String sampleAnswer) {
        this.sampleAnswer = sampleAnswer;
    }

    public String getUserNotes() {
        return userNotes;
    }

    public void setUserNotes(String userNotes) {
        this.userNotes = userNotes;
    }

    public java.util.Map<String, String> getStarFramework() {
        return java.util.Map.of(
                "situation", situation != null ? situation : "",
                "task", task != null ? task : "",
                "action", action != null ? action : "",
                "result", result != null ? result : ""
        );
    }
}
