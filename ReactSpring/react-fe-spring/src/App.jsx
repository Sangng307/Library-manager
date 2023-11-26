import { useEffect, useState } from "react";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./page/login";
import Homepage from "./page/homepage";
import PrivateRoute from "./page/privateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

import Navbar from "./page/Navbar";

import { useUser } from "./component/UserProvider";
import AdNavbar from "./page/AdminNavbar";
import UserNavBar from "./page/UserNavbar";
import Book from "./page/Book";
import Footer from "./page/Footer";
import Admin from "./page/Admin";
import Register from "./page/Register";
import Cart from "./page/Cart";
import Category from "./page/Category";
import Rent from "./page/Rent";
import RentDetail from "./page/RentDetail";

function App() {
  const user = useUser();
  const [role, setRole] = useState(getRoleFromJWT(user.jwt));

  useEffect(() => {
    setRole(getRoleFromJWT(user.jwt));
  }, [user.jwt]);

  function getRoleFromJWT(jwt) {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      return decoded.authority;
    } else {
      return [];
    }
  }

  return (
    <div id="root">
      {role.find((authority) => authority === "ROLE_ADMIN") ? (
        <AdNavbar />
      ) : role.find((authority) => authority === "ROLE_USER") ? (
        <UserNavBar />
      ) : (
        <Navbar />
      )}
      <main className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="admin"
            element={
              role.find((authority) => authority === "ROLE_ADMIN") ? (
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Navigate to="/adminError" replace />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="category"
            element={
              role.find((authority) => authority === "ROLE_ADMIN") ? (
                <PrivateRoute>
                  <Category />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Navigate to="/adminError" replace />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/rent"
            element={
              role.find((authority) => authority === "ROLE_ADMIN") ? (
                <PrivateRoute>
                  <Rent />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Navigate to="/adminError" replace />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/cart"
            element={
              role.find((authority) => authority === "ROLE_USER") ? (
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Navigate to="/adminError" replace />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/rentdetail/:id"
            element={
              role.find((authority) => authority === "ROLE_ADMIN") ? (
                <PrivateRoute>
                  <RentDetail />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Navigate to="/adminError" replace />
                </PrivateRoute>
              )
            }
          />
          <Route path="/userError" element={<Homepage />} />
          <Route path="/adminError" element={<Homepage />} />
          <Route path="book" element={<Book />} />
          <Route path="login" element={<Login />} />

          {/* <Route path="admin" element={<Admin />} /> */}
          <Route path="register" element={<Register />} />
          {/* New route for "unotadmin" */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
