package com.iatracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rounds")   // ✅ force correct table name
public class Round {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roundName;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;

    @JsonIgnore
    @OneToMany(mappedBy = "round", cascade = CascadeType.ALL)
    private List<Question> questions;

    @JsonIgnore
    @OneToMany(mappedBy = "round", cascade = CascadeType.ALL)
    private List<Failure> failures;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoundName() { return roundName; }
    public void setRoundName(String roundName) { this.roundName = roundName; }
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    public Interview getInterview() { return interview; }
    public void setInterview(Interview interview) { this.interview = interview; }
    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
    public List<Failure> getFailures() { return failures; }
    public void setFailures(List<Failure> failures) { this.failures = failures; }
}