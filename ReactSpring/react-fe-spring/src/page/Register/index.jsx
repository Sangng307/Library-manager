import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = useUser();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  function sendRegisterRequest() {
    // Input validation
    // if (!username) {
    //   setErrorMessageUsername("Không được để trống Username.");
    //   return;
    // }
    // if (username.length < 6) {
    //   setErrorMessageUsername("Username phải trên 6 kí tự.");
    //   return;
    // }
    // if (!password) {
    //   setErrorMessagePassword("Không được để trống Password.");
    //   return;
    // }
    // if (password.length < 6) {
    //   setErrorMessagePassword("Password phải trên 6 số.");
    //   return;
    // }

    // if (!email) {
    //   setErrorMessageEmail("Không được để trống Email.");
    //   return;
    // }
    // const emailRegex = /^[^\s@]+@gmail\.com$/i;
    // if (!emailRegex.test(email)) {
    //   setErrorMessageEmail("Email phải đúng định dạng.");
    //   return;
    // }

    const reqBody = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("/api/auth/register", reqBody)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("User registered successfully!");
        } else {
          setErrorMessage("Trùng Username.");
        }
      })
      .catch((error) => {
        console.error("Error registering user: ", error);
        setErrorMessage("Error registering user. Please try again.");
      });
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="p-4 border rounded shadow-sm">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {errorMessageUsername && (
                  <p className="text-danger">{errorMessageUsername}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {errorMessagePassword && (
                  <p className="text-danger">{errorMessagePassword}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errorMessageEmail && (
                  <p className="text-danger">{errorMessageEmail}</p>
                )}
              </div>
              <div>
                {successMessage ? (
                  <p className="text-success">{successMessage}</p>
                ) : (
                  errorMessage && <p className="text-danger">{errorMessage}</p>
                )}
              </div>
              <div className="d-flex justify-content-end gap-3">
                <Button
                  id="submit"
                  variant="primary"
                  onClick={() => sendRegisterRequest()}
                >
                  Register
                </Button>
                <Button
                  id="submit"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
