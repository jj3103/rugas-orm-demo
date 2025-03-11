// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addOrder } from '../store/features/orderSlice';
// import { ArrowLeft, Plus, Save } from 'lucide-react';

// function OrderForm({ closeModal }) {
//     //   const dispatch = useDispatch();
//     //   const navigate = useNavigate();
//     //   const customers = useSelector(state => state.customers.customers);
//     //   const products = useSelector(state => state.products.products);

//     const [formData, setFormData] = useState({
//         customerId: '',
//         items: [],
//     });

//     //   const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     const customer = customers.find(c => c.id === formData.customerId);
//     //     dispatch(addOrder({
//     //       id: Date.now().toString(),
//     //       customerId: formData.customerId,
//     //       customerName: customer.name,
//     //       items: formData.items,
//     //       total: formData.items.reduce((total, item) => total + (item.price * item.quantity), 0),
//     //       status: 'placed',
//     //       date: new Date().toISOString(),
//     //     }));
//     //     closeModal();
//     //   };

//     const handleSubmit = () => { }
//     const customers = []

//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <button onClick={() => navigate('/orders')} className="flex items-center text-gray-600 hover:text-gray-900">
//                     <ArrowLeft className="w-5 h-5 mr-2" /> Back to Orders
//                 </button>
//                 <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
//             </div>

//             <div className="bg-white shadow rounded-lg p-6">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
//                         <select
//                             id="customer"
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                             value={formData.customerId}
//                             onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
//                         >
//                             <option value="">Select a customer</option>
//                             {customers.map(customer => (
//                                 <option key={customer.id} value={customer.id}>{customer.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                         >
//                             <Save className="w-4 h-4 mr-2" /> Create Order
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default OrderForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../store/features/orderSlice";
import { ArrowLeft, Save } from "lucide-react";

function OrderForm({ closeModal }) {
    const [formData, setFormData] = useState({
        customerId: "",
        items: [],
    });

    const customers = [];
    const productsList = []

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* Modal Box */}
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={closeModal}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Orders
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="customer"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Customer
                        </label>
                        <select
                            id="customer"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.customerId}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    customerId: e.target.value,
                                }))
                            }
                        >
                            <option value="">Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Products</label>
                        <div className="grid grid-cols-2 gap-2">
                            {productsList.map(product => (
                                <button
                                    key={product.id}
                                    type="button"
                                    onClick={() => addProduct(product.id)}
                                    className="p-2 border rounded-md hover:bg-gray-100"
                                >
                                    {product.name} - ₹{product.price}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Save className="w-4 h-4 mr-2" /> Create Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderForm;

