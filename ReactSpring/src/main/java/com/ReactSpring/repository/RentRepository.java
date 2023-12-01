package com.ReactSpring.repository;

import com.ReactSpring.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RentRepository extends JpaRepository<Rent,Long> {
    @Query(value = "SELECT r.* FROM Rent r INNER JOIN (SELECT MIN(id) AS id FROM Rent GROUP BY user_id) t ON r.id = t.id", nativeQuery = true)
    List<Rent> findDistinctByUserId();
    @Query(value = "SELECT COUNT(*) FROM Rent WHERE status = 'RENTING' AND user_id = :userId", nativeQuery = true)
    Long countRentingUsersByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM Rent WHERE status = 'RENTING' AND user_id = :userId", nativeQuery = true)
    List<Rent> findDistinctByStatusRentingAndUserId(@Param("userId") Long userId);
    List<Rent> findByUserId(Long userId);
}
