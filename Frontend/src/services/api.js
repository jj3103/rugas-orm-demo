import axios from "axios";

const API_BASE_URL = "http://localhost:5010";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const signUp = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/api/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invalid credentials" };
  }
};

export const isAuthenticated = async (token) => {
  try {
    const response = await api.get("/api/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user data" };
  }
};

export const customerCreate = async (customerData) => {
  try {
    const response = await api.post(
      "/api/customer/createCustomer",
      customerData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create customer" };
  }
};

// Function to fetch all customers
export const getCustomers = async () => {
  try {
    const response = await api.get("/api/customer/getCustomer");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create customer" };
  }
};

// Function to fetch a single customer by ID
export const getCustomerById = async (customerId) => {
  const response = await api.get(`/customers/${customerId}`);
  return response.data;
};

// Function to update customer details
export const updateCustomer = async (customerId, customerData) => {
  const response = await api.put(`/customers/${customerId}`, customerData);
  return response.data;
};

// Function to delete a customer
export const deleteCustomer = async (customerId) => {
  const response = await api.delete(`/customers/${customerId}`);
  return response.data;
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/api/product/create", productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create Product" };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/api/product/getproduct");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get Product" };
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get("/api/order/get");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get Product" };
  }
};
