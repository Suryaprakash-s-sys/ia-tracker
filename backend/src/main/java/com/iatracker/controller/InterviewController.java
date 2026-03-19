package com.iatracker.controller;

import com.iatracker.model.*;
import com.iatracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired private InterviewRepository interviewRepo;
    @Autowired private UserRepository userRepo;

    @GetMapping
    public List<Interview> getAll(@AuthenticationPrincipal UserDetails ud) {
        User user = userRepo.findByUsername(ud.getUsername()).orElseThrow();
        return interviewRepo.findByUserId(user.getId());
    }

    @PostMapping
    public Interview create(@RequestBody Interview interview,
                            @AuthenticationPrincipal UserDetails ud) {
        User user = userRepo.findByUsername(ud.getUsername()).orElseThrow();
        interview.setUser(user);
        return interviewRepo.save(interview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        interviewRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
