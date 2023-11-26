import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="content-wrap">
      <footer className="footer mt-auto">
        <Container>
          <Row>
            <Col md={6} sm={12}>
              <h3>About Us</h3>
              <p>
                Your company description goes here. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
              <Button variant="outline-light">Contact Us</Button>
            </Col>
            <Col md={3} sm={6}>
              <h3>Links</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                {/* Add more links */}
              </ul>
            </Col>
            <Col md={3} sm={6}>
              <h3>Follow Us</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#facebook">Facebook</a>
                </li>
                <li>
                  <a href="#twitter">Twitter</a>
                </li>
                <li>
                  <a href="#linkedin">LinkedIn</a>
                </li>
                {/* Add more social links */}
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="footer-bottom">
          <Container>
            <Row>
              <Col>
                <p className="text-center">
                  &copy; {new Date().getFullYear()} Your Company. All rights
                  reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
