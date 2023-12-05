// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

const AdNavbar = () => {
  const user = useUser();

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  const navStyle = {
    marginRight: "10px",
    color: "#333", // Customize the color of the text
    textDecoration: "none", // Remove the default underline style
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="border-bottom border-2"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={navStyle}>
          E-Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={navStyle}>
              Trang chủ
            </Nav.Link>

            <Nav.Link as={Link} to="/book" style={navStyle}>
              Sách
            </Nav.Link>
          </Nav>
          <ul className="navbar-nav">
            <li
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
          <Nav>
            <NavDropdown
              title="Quản lý admin"
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/admin" style={navStyle}>
                Quản lý sách
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category" style={navStyle}>
                Quản lý thể loại
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rent" style={navStyle}>
                Quản lý thuê sách
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdNavbar;
