import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../component/UserProvider";
import { ToastContainer, toast } from "react-toastify";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const user = useUser();
  const [distinctRents, setDistinctRents] = useState([]);

  useEffect(() => {
    axios
      .get("/user/rentday", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        setDistinctRents(response.data);

        // Compare endDay with today's date
        response.data.forEach((rent) => {
          const endDay = new Date(rent.endDay);
          const today = new Date();
          const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

          if (endDay < today) {
            toast.info(`Bạn quá hạn sách ${rent.book.name} rồi!`);
          } else if (Math.abs(endDay - today) <= oneDay) {
            toast.info(`Bạn sắp quá hạn sách ${rent.book.name} rồi!`);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching distinct rents:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/book")
      .then((response) => {
        setBooks(response.data.slice(0, 12));
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: "sildeOutUp",
    nav: false,
    dots: false,
    margin: 0,
    responsive: {
      992: {
        items: 4,
      },
      768: {
        items: 3,
      },
      576: {
        items: 1,
      },
    },
  };

  useEffect(() => {
    const handleTouchStart = (event) => {
      // Handle touchstart event
    };

    const owlCarouselElement = document.querySelector(".owl-carousel");

    if (owlCarouselElement) {
      owlCarouselElement.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
    }

    return () => {
      if (owlCarouselElement) {
        owlCarouselElement.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, []);
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

  return (
    <div>
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
      <div style={{ maxWidth: "100%", height: "auto" }}>
        <Image
          src="https://glib.hcmus.edu.vn/sites/default/files/inline-images/B%E1%BA%A2N%20IN%20BANNER%20H%C3%80NH%20TRANG%20TRI%20TH%E1%BB%A8C.jpg"
          alt=""
          fluid // Use fluid prop for responsive images
        />
      </div>
      <Container className="mt-4">
        <div style={{}}>
          <h3>Cổ Tích-Thần Thoại</h3>
          {books.length > 0 && (
            <OwlCarousel className="owl-theme" {...options} nav>
              {books.map(
                (bookItem) =>
                  bookItem.category.name.toUpperCase() ===
                    "CỔ TÍCH-THẦN THOẠI" && (
                    <div
                      key={bookItem.id}
                      style={{
                        margin: "5px",
                        padding: "5px",
                        display: "flex",
                        height: "500", // Set a fixed height for each card wrapper
                      }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Card.Body
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "auto",
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
                          <Card.Subtitle className="mb-2 " style={{ flex: 1 }}>
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
                    </div>
                  )
              )}
            </OwlCarousel>
          )}
        </div>

        <div className="mt-4" style={{}}>
          <h3>Lịch Sử-Chính Trị</h3>
          {books.length > 0 && (
            <OwlCarousel className="owl-theme" {...options} nav>
              {books.map(
                (bookItem) =>
                  bookItem.category.name.toUpperCase() ===
                    "LỊCH SỬ-CHÍNH TRỊ" && (
                    <div
                      key={bookItem.id}
                      style={{ margin: "5px", padding: "5px" }}
                    >
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
                    </div>
                  )
              )}
            </OwlCarousel>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
