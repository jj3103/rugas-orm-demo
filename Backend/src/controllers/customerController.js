import { Customer } from "../models/Customer.model.js";

export const createCustomer = async (req, res) => {
  try {
    console.log("🔹 createCustomer Controller Hit!");
    console.log("Cookies received:", req.cookies);
    console.log("Headers received:", req.headers);
    const { name, email, phone, address } = req.body;

    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      createdBy: req.user._id,
    });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user._id });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.remove();
    res.json({ message: "Customer removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
