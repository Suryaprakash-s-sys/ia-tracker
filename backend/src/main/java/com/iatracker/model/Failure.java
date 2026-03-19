package com.iatracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "failures")
public class Failure {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficultyLevel;

    @Column(columnDefinition = "TEXT")
    private String lesson;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id", nullable = false)
    private Round round;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Difficulty getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(Difficulty difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    public String getLesson() { return lesson; }
    public void setLesson(String lesson) { this.lesson = lesson; }
    public Round getRound() { return round; }
    public void setRound(Round round) { this.round = round; }
}