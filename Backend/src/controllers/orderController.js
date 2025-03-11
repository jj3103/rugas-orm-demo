import { Order } from "../models/Order.model.js";
import { Customer } from "../models/Customer.model.js";
import { Product } from "../models/Product.model.js";

export const createOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    const customer = await Customer.findOne({
      _id: customerId,
      createdBy: "67d01e7519caa9340f4f59ec",
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let orderProducts = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product with ID ${item.productId} not found`,
        });
      }

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      customer: customer._id,
      customerName: customer.name,
      products: orderProducts,
      totalAmount,
      createdBy: "67d01e7519caa9340f4f59ec",
    });

    const savedOrder = await order.save();

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("customer", "name") // Populate only the name of the customer
      .populate("products.product");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status, customerId, sort = "-createdAt" } = req.query;
    const filter = { createdBy: "67d01e7519caa9340f4f59ec" };

    if (status) {
      filter.status = status;
    }

    if (customerId) {
      filter.customer = customerId;
    }

    const orders = await Order.find(filter)
      .sort(sort)
      .populate("customer", "name email")
      .populate("products.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })
      .populate("customer")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["placed", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Must be placed, shipped, delivered, or cancelled",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
