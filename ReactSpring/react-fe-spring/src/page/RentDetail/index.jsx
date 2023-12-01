import axios from "axios";
import React, { useState, useEffect } from "react";
import { Badge, Button, Container, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const RentDetail = () => {
  const [rentData, setRentData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const handleStatusChange = (rentId, selectedValue) => {
    const updatedRentData = rentData.map((rent) => {
      if (rent.id === rentId) {
        return { ...rent, status: selectedValue };
      }
      return rent;
    });

    setRentData(updatedRentData);
    console.log(rentData);
  };

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const userIdFromUrl = urlParts[urlParts.length - 1];
        setUserId(userIdFromUrl);

        const response = await axios.get(`/admin/rentdetail/${userIdFromUrl}`);
        if (response.status !== 200) {
          throw new Error("Network response was not ok.");
        }

        setRentData(response.data); // Set the rent data state with the fetched data
      } catch (error) {
        setError(error.message || "Error fetching rent data.");
      }
    };

    fetchRentData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const saveRentStatuses = async () => {
    try {
      const response = await axios.put("/admin/saveRentStatus", rentData);
      toast.success("Cập nhật trạng tái thành công !");
      // Handle success response
      console.log("Rent statuses updated successfully", response.data);
    } catch (error) {
      setError(error.message || "Error saving rent statuses.");
      toast.error("Cập nhật trạng tái thất bại !");
    }
  };

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const formatDateEnd = () => {
    const currentDate = new Date();
    const date = new Date();
    date.setDate(currentDate.getDate() + 7); // Adding 7 days to the current date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <h3>Chờ xác nhận</h3>
        {rentData.length > 0 && (
          <div>
            <h5>Username user: {rentData[0].user.username}</h5>
            {/* Rest of your code */}
          </div>
        )}
        {rentData.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter(
                    (rent) =>
                      rent.status === "RENTING" || rent.status === "PENDING"
                  )
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Form.Select
                          value={rent.status}
                          onChange={(e) => {
                            handleStatusChange(rent.id, e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          <option value="PENDING">Chờ xác nhận</option>
                          <option value="RENTING">Đang thuê</option>
                          <option value="DONE">Hoàn thành</option>
                          <option value="DENIED">Từ chối</option>
                          {/* Add other status options as needed */}
                        </Form.Select>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Button onClick={saveRentStatuses}>Save</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "PENDING")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Badge>{rent.status}</Badge>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>

            <h3>Đang thuê</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Start Day</th>
                  <th>End Day</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "RENTING")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>{formatDate(rent.startDay)}</td>
                      <td>{formatDateEnd(rent.endDay)}</td>
                      <td>
                        <Badge bg="success">{rent.status}</Badge>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h3>Hoàn thành</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "DONE")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Badge bg="info">{rent.status}</Badge>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h3>Từ chối</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "DENIED")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Badge bg="danger">{rent.status}</Badge>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No rent data available</p>
        )}
      </Container>
    </div>
  );
};

export default RentDetail;
