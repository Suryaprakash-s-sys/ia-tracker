package com.iatracker.repository;
import com.iatracker.model.Failure;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FailureRepository extends JpaRepository<Failure, Long> {
    List<Failure> findByRoundId(Long roundId);
}
