import React, { useEffect, useState } from "react";
import { createProducts, getSubCategory } from "../Services/Apis";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../ContextProvider/SocketProvider";

export default function ProductCreate() {
  const [product, setProduct] = useState({
    model: "",
    description: "",
    price: "",
    subCategoryId: "",
  });
  const [image, setImage] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subCategoryId") {
      setProduct({ ...product, subCategoryId: value });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem("adminToken");

    if (!authToken) {
      console.error("No Token Found.");
      return;
    }

    const formData = new FormData();
    formData.append("model", product.model);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("subCategoryId", product.subCategoryId);
    formData.append("poster", image);

    const headers = {
      Authorization: `${authToken}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await createProducts(formData, headers);

      if (response.status === 200) {
        navigate("/admin");
        socket.emit("adminAction", `${product.model} Added Successfully`);
      }
    } catch (error) {
      console.error("Product creation error:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await getSubCategory();
      if (response.status === 200) {
        setSubcategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleCreateProduct}>
        <input
          type="file"
          name="poster"
          onChange={handleImage}
          placeholder="Place Image Here"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={product.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="subCategoryId">Subcategory:</label>
          <select
            name="subCategoryId"
            id="subCategoryId"
            value={product.subCategoryId}
            onChange={handleChange}
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.Brand}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
