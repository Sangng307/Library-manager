import React from "react";
import { Link } from "react-router-dom";

import { Container, Navbar } from "react-bootstrap";

const UserNavBar = () => {
  return (
    <Navbar
      sticky="top"
      bg="light"
      expand="lg"
      className="border-bottom border-2"
    >
      <Container>
        <Link className="navbar-brand" to="/">
          Your Brand
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">
                Book
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
