package com.iatracker.controller;

import com.iatracker.model.*;
import com.iatracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interviews/{interviewId}/rounds")
public class RoundController {

    @Autowired private RoundRepository roundRepo;
    @Autowired private InterviewRepository interviewRepo;

    @GetMapping
    public List<Round> getAll(@PathVariable Long interviewId) {
        return roundRepo.findByInterviewId(interviewId);
    }

    @PostMapping
    public Round create(@PathVariable Long interviewId, @RequestBody Round round) {
        Interview interview = interviewRepo.findById(interviewId).orElseThrow();
        round.setInterview(interview);
        return roundRepo.save(round);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long interviewId, @PathVariable Long id) {
        roundRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
