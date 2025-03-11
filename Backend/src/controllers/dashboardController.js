import { Order } from "../models/Order.model.js";
import { Customer } from "../models/Customer.model.js";

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Get total customers
    const totalCustomers = await Customer.countDocuments({
      createdBy: req.user._id,
    });

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Format orders by status
    const statusCounts = {
      placed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    ordersByStatus.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    // Get recent orders
    const recentOrders = await Order.find({ createdBy: req.user._id })
      .sort("-createdAt")
      .limit(5)
      .populate("customer", "name")
      .select("customer status totalAmount createdAt");

    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          createdBy: req.user._id,
          status: { $in: ["placed", "shipped", "delivered"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // Get monthly sales data
    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdBy: req.user._id,
          status: { $in: ["placed", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      totalCustomers,
      orderCounts: statusCounts,
      totalOrders: Object.values(statusCounts).reduce((a, b) => a + b, 0),
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      recentOrders,
      monthlySales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
