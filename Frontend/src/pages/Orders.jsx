import React, { useState, useEffect } from 'react';
import { PlusCircle, Filter } from 'lucide-react';
import OrderForm from './OrderForm';
import { getAllOrders } from '../services/api.js'

function Orders() {

    const [statusFilter, setStatusFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders()
                setOrders(response);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "placed":
                return "bg-blue-100 text-blue-800";
            case "shipped":
                return "bg-yellow-100 text-yellow-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const statuses = ['all', 'placed', 'shipped', 'delivered', 'cancelled'];
    const filteredOrders = []

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200 flex justify-between">
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                        className="border rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {["all", "placed", "shipped", "delivered", "cancelled"].map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Order
                </button>
                {modalOpen && <OrderForm closeModal={() => setModalOpen(false)} />}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Products
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <React.Fragment key={order._id}>
                                {/* Order Row */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order._id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.customer?.name || order.customerName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            {order.products.map((item) => (
                                                <li key={item._id}>
                                                    {item.product.name} - {item.quantity} x ${item.price} = $
                                                    {(item.quantity * item.price).toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <select
                                            className="border rounded-md py-1 px-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            {["placed", "shipped", "delivered", "cancelled"].map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>


                            </React.Fragment>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default Orders;