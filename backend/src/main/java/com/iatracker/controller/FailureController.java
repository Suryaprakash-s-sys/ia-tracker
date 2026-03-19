package com.iatracker.controller;

import com.iatracker.model.*;
import com.iatracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rounds/{roundId}/failures")
public class FailureController {

    @Autowired private FailureRepository failureRepo;
    @Autowired private RoundRepository roundRepo;

    @GetMapping
    public List<Failure> getAll(@PathVariable Long roundId) {
        return failureRepo.findByRoundId(roundId);
    }

    @PostMapping
    public Failure create(@PathVariable Long roundId, @RequestBody Failure failure) {
        Round round = roundRepo.findById(roundId).orElseThrow();
        failure.setRound(round);
        return failureRepo.save(failure);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long roundId, @PathVariable Long id) {
        failureRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
