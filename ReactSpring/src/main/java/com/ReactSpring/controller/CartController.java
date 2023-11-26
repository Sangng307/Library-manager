package com.ReactSpring.controller;

import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Cart;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.CartRepository;
import com.ReactSpring.service.CartService;
import com.ReactSpring.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private RentService rentService;
    @PostMapping("/addcart")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user, @RequestBody Book book){
        Cart cartByUser = cartService.save(user,book);
        return ResponseEntity.ok(cartByUser);
    }
    @GetMapping("/cart/count")
    public ResponseEntity<Long> countDistinctItemsInCart(@AuthenticationPrincipal User user) {
        long itemCount = cartService.countDistinctItemsByUserId(user.getId());
        return ResponseEntity.ok(itemCount);
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Cart>> getCart(@AuthenticationPrincipal User user) {
        List<Cart> userCart = cartService.getCartByUserId(user.getId());
        return ResponseEntity.ok(userCart);
    }

    @DeleteMapping("/cart/{itemId}")
    public ResponseEntity<?> removeFromCart(@AuthenticationPrincipal User user, @PathVariable Long itemId) {
        try {
            cartRepository.deleteById(itemId);
            return ResponseEntity.ok("Book removed from the cart successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing book from the cart: " + e.getMessage());
        }
    }

    @PostMapping("/rent")
    public ResponseEntity<String> rentItems(@RequestBody List<Long> bookIds, @AuthenticationPrincipal User user) {
        boolean rented = rentService.rentItems(bookIds, user);

        if (rented) {
            try {
                Long userId = user.getId();
                cartService.deleteCartsByUserId(userId);
                return ResponseEntity.ok("Items rented successfully, and removed from the cart.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error renting items or removing from cart: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error renting items");
        }
    }
    @DeleteMapping("/cartdelete")
    public ResponseEntity<String> deleteCartForAuthenticatedUser(@AuthenticationPrincipal User user) {
        if (user != null) {
            Long userId = user.getId();
            cartService.deleteCartsByUserId(userId);
            return ResponseEntity.ok("Carts deleted successfully for the authenticated user.");
        } else {
            return ResponseEntity.badRequest().body("User not authenticated.");
        }
    }
}
