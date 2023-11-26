import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../component/UserProvider";
import { motion } from "framer-motion";
const PrivateRoute = (props) => {
  const user = useUser();
  const { children } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/auth/validate?token=${user.jwt}`, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        })
        .then((response) => {
          setIsValid(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error validating user:", error);
          setIsValid(false);
          setIsLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.div
        className="loading-animation"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  ) : isValid === true ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
