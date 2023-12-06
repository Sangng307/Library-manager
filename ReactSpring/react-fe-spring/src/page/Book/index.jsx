import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const Book = () => {
  const [book, setBook] = useState([]);
  const [originalBook, setOriginalBook] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterByAuthor, setFilterByAuthor] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 12;
  const user = useUser();
  const [sortedCurrentBooks, setSortedCurrentBooks] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleAddToCart = (selectedBook) => {
    axios
      .post("/user/addcart", selectedBook, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        toast.success("🦄 Thêm vào giỏ hàng thành công!");
        console.log("Book added to cart:", response.data);
      })
      .catch((error) => {
        toast.error(
          "🦄 Thêm vào giỏ hàng thất bại chỉ được thuê 3 quyển sách 1 lần!"
        );
        console.error("Error adding book to cart:", error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/book", {})
      .then((response) => {
        setBook(response.data);

        setOriginalBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, [user.jwt]);

  const handleSort = (sortOrder) => {
    if (sortOrder === "asc") {
      toast.success("Đã sort từ A-Z!");
      setSorted(true);
      const sortedAsc = [...currentBooks].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSortedCurrentBooks(sortedAsc); // Save the sorted books separately
    } else if (sortOrder === "desc") {
      toast.success("Đã sort từ Z-A!");
      setSorted(true);
      const sortedDesc = [...currentBooks].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setSortedCurrentBooks(sortedDesc); // Save the sorted books separately
    }
  };

  const handleCategoryFilter = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleAuthorFilter = (authorName) => {
    if (selectedAuthor === authorName) {
      setSelectedAuthor("");
      setFilterByAuthor(false);
    } else {
      setSelectedAuthor(authorName);
      setFilterByAuthor(true);
      setSelectedCategories([]); // Reset selected categories
    }
  };

  const handleShowAll = () => {
    window.location.reload();
  };

  const filteredBooks = book
    ? filterByAuthor
      ? book.filter((item) => item.author === selectedAuthor)
      : selectedCategories.length
      ? book.filter((item) => selectedCategories.includes(item.category.name))
      : book
    : [];

  const offset = currentPage * booksPerPage;
  const currentBooks = book
    ? filteredBooks.slice(offset, offset + booksPerPage)
    : [];

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Filter books based on search term
    const filtered = originalBook.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBook(filtered); // Update the 'book' state with filtered results
  }, [searchTerm, originalBook]);
  return (
    <>
      <Container>
        <div style={{ margin: "2em" }}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                padding: "0 1em",
                borderRight: "1px solid #ddd",
              }}
            >
              <h2 className="text-center" style={{ color: "#FFB6C1" }}>
                Lọc
              </h2>
              <ul
                className="animated-list"
                style={
                  {
                    /* your styles */
                  }
                }
              >
                <motion.li
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ listStyleType: "none" }}
                >
                  <motion.h2
                    onClick={() => {
                      setShowAuthors(!showAuthors);
                      setShowCategories(false);
                    }}
                    style={{
                      color: showAuthors ? "#FFB6C1" : "#555",
                      fontWeight: showAuthors ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                  >
                    Tác giả
                  </motion.h2>
                  <AnimatePresence>
                    {showAuthors && (
                      <motion.div
                        className="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {Array.from(
                          new Set(book.map((item) => item.author))
                        ).map((authorName, index) => (
                          <div key={index}>
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedAuthor.includes(authorName)}
                                onChange={() => handleAuthorFilter(authorName)}
                              />{" "}
                              {authorName}
                            </label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

                <motion.li
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ listStyleType: "none" }}
                >
                  <motion.h2
                    onClick={() => {
                      setShowCategories(!showCategories);
                      setShowAuthors(false);
                    }}
                    style={{
                      color: showCategories ? "#FFB6C1" : "#555",
                      fontWeight: showCategories ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                  >
                    Thể loại
                  </motion.h2>
                  <AnimatePresence>
                    {showCategories && (
                      <motion.div
                        className="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {Array.from(
                          new Set(book.map((item) => item.category.name))
                        ).map((categoryName, index) => (
                          <div key={index}>
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(
                                  categoryName
                                )}
                                onChange={() =>
                                  handleCategoryFilter(categoryName)
                                }
                              />{" "}
                              {categoryName}
                            </label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              </ul>
            </div>
            <div style={{ flex: 4, padding: "0 1em" }}>
              <div style={{ marginBottom: "1em" }}>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#FFB6C1",
                        color: "white",
                        border: "none",
                        padding: "0.5em 1em",
                        borderRadius: "5px",
                      }}
                      onClick={handleShowAll}
                    >
                      Hiện tất cả
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#FFB6C1",
                        color: "white",
                        border: "none",
                        padding: "0.5em 1em",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleSort("asc")}
                    >
                      A-Z
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#FFB6C1",
                        color: "white",
                        border: "none",
                        padding: "0.5em 1em",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleSort("desc")}
                    >
                      Z-A
                    </Button>
                  </Col>
                  <Col>
                    <Form.Group controlId="formSearch">
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên sách để tìm kiếm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "400px" }} // Set the width to 400px
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {sortedCurrentBooks && sortedCurrentBooks.length > 0 ? (
                <Container>
                  <Row xs={1} md={2} lg={4} className="g-4 mt-3">
                    {sortedCurrentBooks.map((bookItem) => (
                      <Col key={bookItem.id} className="p-0">
                        <Card style={{ width: "100%" }}>
                          <Card.Body
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minHeight: "200px",
                            }}
                          >
                            <Link
                              to={`/book/${bookItem.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <img
                                src={`${bookItem.image}`}
                                alt="Book Cover"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                              <Card.Title style={{ flex: 1 }}>
                                {bookItem.name}
                              </Card.Title>
                            </Link>
                            <Card.Subtitle
                              className="mb-2 text-muted"
                              style={{ flex: 1 }}
                            >
                              {bookItem.author}
                            </Card.Subtitle>
                            <div style={{ flex: 1 }}>
                              <p>
                                <b>Thể loại:</b> {bookItem.category.name}
                              </p>
                              <p>
                                <b>Mô tả:</b> {bookItem.description}
                              </p>
                            </div>
                            {user.jwt && (
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="Light"
                                  style={{
                                    width: "48%",
                                    backgroundColor: "#FFB6C1", // Set the background color here
                                    color: "white", // Ensure readable text by setting text color to white
                                  }}
                                  onClick={() => handleAddToCart(bookItem)}
                                >
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </Button>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <div className="pagination-container justify-content-center">
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                    />
                  </div>
                </Container>
              ) : !sorted ? (
                <Container>
                  <Row xs={1} md={2} lg={4} className="g-4 mt-3">
                    {currentBooks.map((bookItem) => (
                      <Col key={bookItem.id} className="p-0">
                        <Card style={{ width: "100%" }}>
                          <Card.Body
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minHeight: "200px",
                            }}
                          >
                            <Link
                              to={`/book/${bookItem.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <img
                                src={`${bookItem.image}`}
                                alt="Book Cover"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                              <Card.Title style={{ flex: 1 }}>
                                {bookItem.name}
                              </Card.Title>
                            </Link>
                            <Card.Subtitle
                              className="mb-2 text-muted"
                              style={{ flex: 1 }}
                            >
                              {bookItem.author}
                            </Card.Subtitle>
                            <div style={{ flex: 1 }}>
                              <p>
                                <b>Thể loại:</b> {bookItem.category.name}
                              </p>
                              <p>
                                <b>Mô tả:</b> {bookItem.description}
                              </p>
                            </div>
                            {user.jwt && (
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="Light"
                                  style={{
                                    fontSize: "20px",
                                    width: "48%",
                                    backgroundColor: "#FFB6C1", // Set the background color here
                                    color: "white", // Ensure readable text by setting text color to white
                                  }}
                                  onClick={() => handleAddToCart(bookItem)}
                                >
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </Button>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <div className="pagination-container justify-content-center ">
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                    />
                  </div>
                </Container>
              ) : (
                <p>No books found with the selected categories</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Book;
