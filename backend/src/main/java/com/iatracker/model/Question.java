package com.iatracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    private String topic;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id", nullable = false)
    private Round round;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    public Round getRound() { return round; }
    public void setRound(Round round) { this.round = round; }
}