import React, { useEffect, useState } from "react";
import {
  getSubCategory,
  productUpdateFunction,
  singleProductGetFunction,
} from "../Services/Apis";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductUpdate() {
  const [product, setProduct] = useState({
    model: "",
    description: "",
    price: "",
    subCategoryId: "",
  });

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const { productId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (e) => {
    setNewImage(e.target.files[0]);
  };

  const fetchProduct = async () => {
    try {
      const response = await singleProductGetFunction(productId);
      if (response.status === 200) {
        const fetchedProduct = response.data;
        setImage(fetchedProduct.imageUrl);
        setProduct({
          model: fetchedProduct.model,
          description: fetchedProduct.description,
          price: fetchedProduct.price,
          subCategoryId: fetchedProduct.subCategory._id,
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
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
    fetchProduct();
    fetchSubcategories();
  }, [productId]);

  const handleUpdateProduct = async (e) => {
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
    formData.append("poster", newImage || image);

    const headers = {
      Authorization: `${authToken}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await productUpdateFunction(formData, headers);
      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Product update error:", error);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleUpdateProduct}>
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
