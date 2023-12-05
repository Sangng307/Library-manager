import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../../component/UserProvider";

const RentUser = () => {
  const [distinctRents, setDistinctRents] = useState([]);
  const user = useUser();

  useEffect(() => {
    axios
      .get("/user/rentday", {
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
  }, [user.jwt]); // Adding user.jwt to the dependency array to re-fetch data when it changes

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <Container className="mt-5">
        <h2>Sách đang thuê</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Day</th>
              <th>End Day</th>
              {/* Add more table headings as needed */}
            </tr>
          </thead>
          <tbody>
            {distinctRents.map((rent) => (
              <tr key={rent.id}>
                <td>{rent.id}</td>
                <td>{rent.book.name}</td>
                <td>{formatDate(rent.startDay)}</td>
                <td>{formatDate(rent.endDay)}</td>
                {/* Add more table cells corresponding to data fields */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default RentUser;
