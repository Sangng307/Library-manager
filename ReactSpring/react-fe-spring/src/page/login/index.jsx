import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const user = useUser();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  // useEffect(() => {
  //   const rememberedUser = localStorage.getItem("rememberedUser");

  //   if (rememberedUser) {
  //     const user = JSON.parse(rememberedUser);
  //     setUsername(user.username);
  //     setPassword(user.password);
  //     setRememberMe(true);
  //   }
  // }, []);

  function sendLoginRequest(event) {
    event.preventDefault();

    // Validation checks
    let isValid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const reqBody = {
        username: username,
        password: password,
      };

      axios
        .post("/api/auth/login", reqBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (rememberMe) {
              localStorage.setItem("rememberedUser", JSON.stringify(reqBody));
            }

            return Promise.all([response.data, response.headers]);
          } else {
            return Promise.reject("Invalid login");
          }
        })
        .then(([body, headers]) => {
          user.setJwt(headers["authorization"]);
          redirectToHome();
        })
        .catch((error) => {
          console.log(error);
          setLoginError("Thông tin đăng nhập không chính xác");
        });
    }
  }

  function redirectToHome() {
    window.location.href = "/"; // Redirect to the home page
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div
              className="p-4 border rounded shadow-sm"
              style={{
                position: "relative",
                background: "white",
                border: "none",
                height: "auto",
              }}
            >
              <form onSubmit={sendLoginRequest}>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label"
                    style={{ color: "black" }}
                  >
                    Username
                  </label>
                  <input
                    style={{ marginTop: "5px" }}
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <div className="mb-2 text-danger">{usernameError}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    style={{ marginTop: "5px" }}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="mb-2 text-danger">{passwordError}</div>
                </div>
                <div className="mb-2 text-danger">{loginError}</div>
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Nhớ thông tin?
                  </label>
                </div> */}
                <div className="d-flex flex-column flex-md-row justify-content-md-end gap-3">
                  <Button variant="primary" type="submit">
                    Đăng nhập
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      redirectToHome();
                    }}
                  >
                    Quay lại
                  </Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
