import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./Helper";

export const userRegisterFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/user/register`, data, header);
};

export const userLoginFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/user/login`, data, header);
};

export const createCategory = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/add/category`, data, header);
};

export const getCategory = async (data, header) => {
  return await commonRequest("GET", `${BASE_URL}/get/category`, data, header);
};

export const createSubCategory = async (data, header) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/add/sub-category`,
    data,
    header
  );
};

export const getSubCategory = async (data, header) => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/get/sub-category`,
    data,
    header
  );
};

export const createProducts = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/add/products`, data, header);
};

export const getProductsFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/get/products`, "");
};

export const singleProductGetFunction = async (productId) => {
  return await commonRequest("GET", `${BASE_URL}/get/product/${productId}`, "");
};

export const productUpdateFunction = async (productId, data, header) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/update/product/${productId}`,
    data,
    header
  );
};

export const deleteProductFunction = async (productId) => {
  return await commonRequest(
    "DELETE",
    `${BASE_URL}/delete/product/${productId}`,
    {}
  );
};
