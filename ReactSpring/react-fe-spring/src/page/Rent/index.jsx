import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";

const Rent = () => {
  const [distinctRents, setDistinctRents] = useState([]);
  const [outDayRent, setOutDayRent] = useState([]);
  const user = useUser();
  useEffect(() => {
    axios
      .get("/admin/rent", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        setDistinctRents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching distinct rents:", error);
      });
  }, []);

  useEffect(() => {
    // Assuming user and axios are already defined
    axios
      .get("/admin/rentdayadmin", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        const rentsFilteredByEndDay = response.data.filter(
          (rent) => new Date(rent.endDay) < new Date()
        );

        // Create a map to store unique user IDs
        const uniqueUserIds = new Map();
        rentsFilteredByEndDay.forEach((rent) => {
          // If user ID doesn't exist in the map, add it
          if (!uniqueUserIds.has(rent.user.id)) {
            uniqueUserIds.set(rent.user.id, rent.id);
          }
        });

        // Filter rents based on unique user IDs
        const uniqueRents = Array.from(uniqueUserIds, ([userId, rentId]) => {
          return rentsFilteredByEndDay.find(
            (rent) => rent.user.id === userId && rent.id === rentId
          );
        });

        setOutDayRent(uniqueRents);
      })
      .catch((error) => {
        console.error("Error fetching distinct rents:", error);
      });
  }, []);

  return (
    <div>
      <Container>
        <h1>Thông tin user muốn thuê sách</h1>
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
        <div>
          <h2>Outdated Rents</h2>
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
              {outDayRent.map((rent) => (
                <tr key={rent.id}>
                  <td>{rent.user.id}</td>
                  <td>{rent.user.username}</td>
                  <td>{rent.user.email}</td>
                  <td>
                    <Button variant="danger">
                      <Link
                        to={`/rentdetail/${rent.user.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ color: "white" }}
                        />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Rent;
