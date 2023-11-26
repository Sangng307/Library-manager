import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Rent = () => {
  const [distinctRents, setDistinctRents] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/rent")
      .then((response) => {
        setDistinctRents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching distinct rents:", error);
      });
  }, []);

  return (
    <div>
      <Container>
        <h1>Rent List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
              {/* Add other columns as needed */}
            </tr>
          </thead>
          <tbody>
            {distinctRents.map((rent) => (
              <tr key={rent.id}>
                <td>{rent.user.id}</td>
                <td>{rent.user.username}</td>
                <td>{rent.user.email}</td>
                <td>
                  <Button variant="info">
                    <Link
                      to={`/rentdetail/${rent.user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Rent;
