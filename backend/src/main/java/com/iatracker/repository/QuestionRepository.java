package com.iatracker.repository;
import com.iatracker.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByRoundId(Long roundId);
}
