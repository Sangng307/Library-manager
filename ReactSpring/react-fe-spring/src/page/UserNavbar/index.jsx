import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { Container, Navbar } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const UserNavBar = ({}) => {
  const user = useUser();
  // const [count, setCount] = useState(0);

  const [length, setLength] = useState([]);

  useEffect(() => {
    axios
      .get("/user/rentday", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        setLength(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching distinct rents:", error);
      });
  }, [user.jwt]); // Adding user.jwt to the dependency array to re-fetch data when it changes

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  return (
    <Navbar
      sticky="top"
      bg="light"
      expand="lg"
      className="border-bottom border-2"
    >
      <Container>
        <Link className="navbar-brand" to="/">
          E-Library
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">
                Sách
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/userRent"
                style={{ position: "relative", display: "inline-block" }}
              >
                <FontAwesomeIcon icon={faBook} />
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",

                    color: "red",
                    borderRadius: "50%",
                    padding: "5px",
                    fontSize: "19px",
                  }}
                >
                  {length}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            <li
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
