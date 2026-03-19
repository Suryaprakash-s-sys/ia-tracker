package com.iatracker.controller;

import com.iatracker.model.*;
import com.iatracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rounds/{roundId}/questions")
public class QuestionController {

    @Autowired private QuestionRepository questionRepo;
    @Autowired private RoundRepository roundRepo;

    @GetMapping
    public List<Question> getAll(@PathVariable Long roundId) {
        return questionRepo.findByRoundId(roundId);
    }

    @PostMapping
    public Question create(@PathVariable Long roundId, @RequestBody Question question) {
        Round round = roundRepo.findById(roundId).orElseThrow();
        question.setRound(round);
        return questionRepo.save(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long roundId, @PathVariable Long id) {
        questionRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
