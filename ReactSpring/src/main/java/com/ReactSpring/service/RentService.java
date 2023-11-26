package com.ReactSpring.service;

import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Rent;
import com.ReactSpring.entity.StatusRentEnum;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.BookRepository;
import com.ReactSpring.repository.RentRepository;
import com.ReactSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentService {
    @Autowired
    private RentRepository rentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    public boolean rentItems(List<Long> itemIds, User user) {
        if (user == null) {
            return false;
        }

        for (Long itemId : itemIds) {
            Book book = bookRepository.findById(itemId).orElse(null);
            if (book != null) {
                Rent rent = new Rent();
                rent.setUser(user);
                rent.setBook(book);
                rent.setStatus(StatusRentEnum.PENDING.name()); // Set the status as needed
                rent.setStartDay(null);
                rent.setEndDay(null);
                rentRepository.save(rent);
            }
        }

        return true;
    }
}
