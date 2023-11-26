package com.ReactSpring.controller;

import com.ReactSpring.entity.Rent;
import com.ReactSpring.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class RentController {

    @Autowired
    private RentRepository rentRepository;

    @GetMapping("/rent")
    public List<Rent> getDistinctRentsByUserId() {
        return rentRepository.findDistinctByUserId();
    }

    @GetMapping("/rentdetail/{userId}")
    public List<Rent> getByUserId(@PathVariable Long userId) {
        return rentRepository.findByUserId(userId);
    }

    @PutMapping("/saveRentStatus")
    public String saveRentStatus(@RequestBody List<Rent> rentData) {
        // Get today's date
        Date today = new Date();

        // Create a Calendar instance and set it to today's date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);

        // Set the end date 7 days from today
        calendar.add(Calendar.DAY_OF_MONTH, 7);
        Date endDay = calendar.getTime();

        // Set the start date as today
        Date startDay = today;

        // Update each Rent object with the start and end dates
        for (Rent rent : rentData) {
            if(rent.getStatus().equals("RENTING")) {
                rent.setStartDay(startDay);
                rent.setEndDay(endDay);

                // Save the updated rent object with new dates
                rentRepository.save(rent);
            }else {
                rentRepository.save(rent);
            }
        }

        return "Rent statuses updated successfully";
    }
}
