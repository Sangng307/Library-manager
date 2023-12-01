import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Cart = ({}) => {
  const [cartItems, setCartItems] = useState([]);
  const user = useUser();
  const [price, setPrice] = useState();
  const formattedPrice = (price / 1000).toFixed(3);

  const handlePay = async () => {
    try {
      const response = await axios.get("/pay", {
        params: { price: price }, // Sending the price as a query parameter
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      if (response.status === 200) {
        window.location.href = response.data; // Redirect to the payment URL received from the backend
      } else {
        console.error("Failed to initiate payment");
        // Handle other response statuses or errors
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle payment initiation error
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user/cart", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });

        setCartItems(response.data);
        const totalPrice = response.data.length * 15000;
        setPrice(totalPrice);

        // Update the count of cart items in the Navbar component
      } catch (error) {
        console.error("Error fetching books in the cart:", error);
      }
    };

    fetchData();
  }, [user.jwt]);

  const handleRemoveItem = async (itemId) => {
    try {
      // Send a request to remove the item from the cart
      await axios.delete(`/user/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      // Update the state to reflect the changes and recalculate total price
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );

      // Recalculate the total price using the updated cartItems

      // Update the total price state
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  const handleRentItems = async () => {
    try {
      await axios.post(
        "/user/rent",
        cartItems.map((item) => item.book.id),
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      console.log("User ID:", user.userId);
      console.log("Cart Items:", cartItems);

      // Log success message to the console
      console.log("Items rented successfully!");

      // Refetch the cart items after a successful rental
      const response = await axios.get("/user/cart", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      setCartItems(response.data);
      toast.success("Đã gửi đăng ký mượn sách!");
    } catch (error) {
      console.error("Error renting items:", error);
      toast.error("Bạn đang mượn 3 quyển sách!");
    }
  };

  const handleDeleteAllItems = async () => {
    try {
      await axios.delete("/user/cartdelete", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      const response = await axios.get("/user/cart", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      setCartItems(response.data);
      console.log("All items deleted successfully!");
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
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
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <Container className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col size="12">
              <Card
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <p className="mb-0 text-muted">
                            {cartItems.length} items
                          </p>
                        </div>

                        <hr className="my-4" />

                        {/* Render list of books in the cart */}
                        {cartItems.map((item) => (
                          <Row
                            key={item.id} // Assuming item.id is unique
                            className="mb-4 d-flex justify-content-between align-items-center"
                          >
                            <Col md="2" lg="2" xl="2">
                              <Card.Img
                                src={item.book.image}
                                className="rounded-3"
                                alt={item.book.name}
                              />
                            </Col>
                            <Col md="3" lg="3" xl="3">
                              <h6 className="text-muted">
                                {item.book.category.name}
                              </h6>
                              <h6 className="text-black mb-0">
                                {item.book.name}
                              </h6>
                            </Col>

                            <Col md="1" lg="1" xl="1" className="text-end">
                              <Button
                                variant="link"
                                className="text-muted"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                x
                              </Button>
                            </Col>
                          </Row>
                        ))}
                        <div className="d-flex justify-content-end align-items-end">
                          <Button onClick={handleDeleteAllItems}>
                            Delete All
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg="4" className="bg-grey">
                      {/* ... (rest of your component) */}
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-center mb-4">
                          <h3 className="text-uppercase">
                            Tổng số sách {cartItems.length}
                          </h3>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                          <h5>phí thuê 1 quyển - 15.000VND/7day</h5>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                          {formattedPrice > 1 && <h5>{formattedPrice}VND</h5>}
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            style={{ marginRight: "10px" }}
                            onClick={handlePay}
                          >
                            Thanh toán VnPay
                          </Button>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-2">
                          <Button
                            style={{ marginRight: "10px" }}
                            onClick={handleRentItems}
                          >
                            Thanh toán trực tiếp
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Cart;
