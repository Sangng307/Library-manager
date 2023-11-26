package com.ReactSpring.controller;

import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Category;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.CategoryRepository;
import com.ReactSpring.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminCategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;
    @GetMapping("/category")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user){
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/category")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        Category createdCategory = categoryRepository.save(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/category/{categoryId}")
    public ResponseEntity<?> updateCategory(
            @PathVariable("categoryId") Long categoryId,
            @RequestBody Category updatedCategory
    ) {
        Category category = categoryService.findById(categoryId);

        if (category == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the category with new values
        category.setName(updatedCategory.getName()); // Assuming 'setName' method exists

        Category updated = categoryService.save(category);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/category/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        try {
            categoryService.deleteCategoryById(categoryId);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting category");
        }
    }
}
