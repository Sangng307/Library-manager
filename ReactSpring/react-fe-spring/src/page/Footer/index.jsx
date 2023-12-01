import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="content-wrap">
      <footer className="footer mt-auto">
        <Container>
          <Row>
            <Col md={6} sm={12}>
              <h3>Hệ thống chi nhánh</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#home">Khu vực miền nam</a>
                </li>
                <li>
                  <a href="#about">Khu vực miền bắc</a>
                </li>
                <li>
                  <a href="#services">Chính sách bảo hành</a>
                </li>
                {/* Add more links */}
              </ul>
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
                  &copy; {new Date().getFullYear()} My Company. All rights
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
