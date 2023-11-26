package com.ReactSpring.repository;

import com.ReactSpring.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentRepository extends JpaRepository<Rent,Long> {
    @Query(value = "SELECT r.* FROM Rent r INNER JOIN (SELECT MIN(id) AS id FROM Rent GROUP BY user_id) t ON r.id = t.id", nativeQuery = true)
    List<Rent> findDistinctByUserId();

    List<Rent> findByUserId(Long userId);
}
