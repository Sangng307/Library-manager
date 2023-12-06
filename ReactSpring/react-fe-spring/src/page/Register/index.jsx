import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import axios from "axios";
import validator from "validator";
import ReCAPTCHA from "react-google-recaptcha";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  function sendRegisterRequest() {
    let hasError = false;

    if (!validator.isLength(username, { min: 6, max: 20 })) {
      setErrorMessageUsername("Username must be between 6 and 20 characters.");
      hasError = true;
    } else {
      setErrorMessageUsername("");
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
      setErrorMessagePassword("Password must be between 6 and 20 characters.");
      hasError = true;
    } else {
      setErrorMessagePassword("");
    }

    if (!validator.isEmail(email)) {
      setErrorMessageEmail("Invalid email format.");
      hasError = true;
    } else {
      setErrorMessageEmail("");
    }

    if (hasError) {
      // Nếu có lỗi xảy ra, xử lý theo cách phù hợp ở đây
      // Ví dụ: hiển thị thông báo chung hoặc ngăn ngừa việc tiếp tục
      return; // hoặc có thể thực hiện hành động phù hợp khác
    }
    if (!captchaValue) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }
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
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
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

              <div className="mb-3">
                <ReCAPTCHA
                  sitekey="6LdRsSgpAAAAAIGY4c0_wxl6i1h4NWToPGDCpxe7"
                  onChange={handleCaptchaChange}
                />
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
                  Đăng ký
                </Button>
                <Button
                  id="submit"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Đăng nhập
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
