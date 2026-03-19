package com.iatracker.repository;
import com.iatracker.model.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RoundRepository extends JpaRepository<Round, Long> {
    List<Round> findByInterviewId(Long interviewId);
}
