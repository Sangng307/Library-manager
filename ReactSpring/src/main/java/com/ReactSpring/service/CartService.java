package com.ReactSpring.service;

import com.ReactSpring.entity.AuthorityEnum;
import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Cart;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.BookRepository;
import com.ReactSpring.repository.CartRepository;
import com.ReactSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart save(User user, Book book) {
        Long userId = user.getId();

        // Check if adding the book will exceed the limit
        Integer totalQuantityInCart = cartRepository.getTotalQuantityInCartByUserId(userId);
        if (totalQuantityInCart > 2) {
            // You can throw an exception or handle the case where the limit is exceeded
            throw new RuntimeException("You can't add more than 3 books to the cart.");
        }

        // Proceed with adding the book to the cart
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setBook(book);
        cartRepository.save(cart);
        return cart;
    }
    public long countDistinctItemsByUserId(Long userId) {
        return cartRepository.countDistinctItemsByUserId(userId);
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long userId, Long itemId) {
        Optional<Cart> cartItem = cartRepository.findByUserIdAndBookId(userId, itemId);

        if (cartItem.isPresent()) {
            cartRepository.delete(cartItem.get());
        } else {
            throw new NoSuchElementException("Book not found in the user's cart.");
        }
    }
    @Transactional
    public void deleteCartsByUserId(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

}
