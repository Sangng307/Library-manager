package com.ReactSpring.service;

import com.ReactSpring.entity.Category;
import com.ReactSpring.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Category findById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        return categoryOptional.orElse(null);
    }

    // Other service methods for saving, updating, deleting categories, etc.
    // For example:

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
