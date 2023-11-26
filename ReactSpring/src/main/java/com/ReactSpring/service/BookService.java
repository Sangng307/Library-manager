package com.ReactSpring.service;

import com.ReactSpring.entity.Book;
import com.ReactSpring.entity.Category;
import com.ReactSpring.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public ResponseEntity<Book> updateBook(
            Long id,
            MultipartFile imageFile,
            String name,
            Category category,
            String author,
            String description) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();

            // Update existingBook fields with updatedBook fields
            existingBook.setName(name);
            existingBook.setCategory(category);
            existingBook.setAuthor(author);
            existingBook.setDescription(description);

            if (imageFile != null && !imageFile.isEmpty()) {
                try {
                    // Save the image file and store the original file name
                    String originalFileName = imageFile.getOriginalFilename();
                    String imagePath = "D:\\FullProjectclone\\ReactSpring\\react-fe-spring\\public\\" + originalFileName;
                    // Save the image file to the specified directory
                    imageFile.transferTo(new File(imagePath));
                    existingBook.setImage(originalFileName);

                } catch (IOException e) {
                    // Handle file upload error
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            // Save the changes using the BookService
            bookRepository.save(existingBook);

            return new ResponseEntity<>(existingBook, HttpStatus.OK);
        } else {
            // Handle the case where the book is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
