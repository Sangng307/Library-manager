package com.ReactSpring.controller;

import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Category;
import com.ReactSpring.entity.User;
import com.ReactSpring.repository.BookRepository;
import com.ReactSpring.repository.CategoryRepository;
import com.ReactSpring.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminBookController {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    BookService bookService;
    @Autowired
    CategoryRepository categoryRepository;
    @GetMapping("/book")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user){
        List<Book> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(@AuthenticationPrincipal User user) {
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Book> createBook(
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam("name") String name,
            @RequestParam("category") Long categoryId, // Change to category ID
            @RequestParam("author") String author,
            @RequestParam("description") String description)  {

        try {
            Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
            if (optionalCategory.isEmpty()) {
                // Handle case where category ID doesn't exist
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Category category = optionalCategory.get();

            Book newBook = new Book();
            newBook.setName(name);
            newBook.setCategory(category);
            newBook.setAuthor(author);
            newBook.setDescription(description);

            if (imageFile != null && !imageFile.isEmpty()) {
                // Save the image file and store the original file name
                String originalFileName = imageFile.getOriginalFilename();
                String imagePath = "D:\\QuanLyThuVien-master\\ReactSpring\\react-fe-spring\\public\\" + originalFileName;
                // Save the image file to the specified directory
                imageFile.transferTo(new File(imagePath));
                newBook.setImage(originalFileName);
            }

            Book createdBook = bookRepository.save(newBook);
            return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
        } catch (IOException e) {
            // Handle file upload error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(
            @PathVariable Long id,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam("name") String name,
            @RequestParam("category") Long categoryId,
            @RequestParam("author") String author,
            @RequestParam("description") String description) {

        try {
            Optional<Book> optionalBook = bookRepository.findById(id);
            if (optionalBook.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Book book = optionalBook.get();

            // Fetch the category using categoryId
            Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
            if (optionalCategory.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Category category = optionalCategory.get();

            // Update book details
            book.setName(name);
            book.setCategory(category);
            book.setAuthor(author);
            book.setDescription(description);

            if (imageFile != null && !imageFile.isEmpty()) {
                // Save the image file and store the original file name
                String originalFileName = imageFile.getOriginalFilename();
                String imagePath = "D:\\QuanLyThuVien-master\\ReactSpring\\react-fe-spring\\public\\" + originalFileName;
                // Save the image file to the specified directory
                imageFile.transferTo(new File(imagePath));
                book.setImage(originalFileName);
            }

            Book updatedBook = bookRepository.save(book);
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
