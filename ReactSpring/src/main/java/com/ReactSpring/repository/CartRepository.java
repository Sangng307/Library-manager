package com.ReactSpring.repository;

import com.ReactSpring.entity.Cart;
import com.ReactSpring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT COALESCE(SUM(c.user.id), 0) FROM Cart c WHERE c.user.id = :userId")
    Integer getTotalQuantityInCartByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(DISTINCT c.book) FROM Cart c WHERE c.user.id = :userId")
    long countDistinctItemsByUserId(@Param("userId") Long userId);
    Optional<Cart> findByUserIdAndBookId(Long userId, Long itemId);


    @Transactional
    void deleteByUserId(Long userId);

    List<Cart> findByUserId(Long userId);
}
