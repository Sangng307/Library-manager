import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Container } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const user = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/admin/category", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [user.jwt]);

  const handleInputChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleEdit = (categoryId, currentName) => {
    setEditCategoryId(categoryId);
    setNewCategoryName(currentName);
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      const response = await axios.put(
        `/admin/category/${categoryId}`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? response.data : category
      );
      setCategories(updatedCategories);
      setEditCategoryId(null);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setNewCategoryName("");
  };

  const addCategory = async () => {
    try {
      const response = await axios.post(
        "/admin/category",
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/admin/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Add Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            style={{ marginTop: "10px" }}
            variant="primary"
            onClick={addCategory}
          >
            Add
          </Button>
        </Form>
        <h2>Categories</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  {editCategoryId === category.id ? (
                    <Form.Control
                      type="text"
                      value={newCategoryName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  {editCategoryId === category.id ? (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="success"
                        onClick={() => handleSaveEdit(category.id)}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="info"
                      onClick={() => handleEdit(category.id, category.name)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
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

export default Category;
