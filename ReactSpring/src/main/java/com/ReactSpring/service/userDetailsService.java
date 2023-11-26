package com.ReactSpring.service;

import com.ReactSpring.entity.User;
import com.ReactSpring.repository.UserRepository;
import com.ReactSpring.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userDetailsService implements UserDetailsService {
    @Autowired
    private CustomPasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByUsername(username);
        return userOpt.orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }
}
