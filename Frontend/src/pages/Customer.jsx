import React from 'react';
import { useState, useEffect } from 'react';
import { UserPlus, Search, Mail, Phone } from 'lucide-react';
import CustomerForm from './CustomerForm';
import { getCustomers } from '../services/api'

function Customers() {
    const [modalOpen, setModelOpen] = useState(false)
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response);
            } catch (error) {
                console.log("Customer Fetch Error:", error);
            }
        };
        fetchCustomers();
    }, []);

    const handleCustomerAdded = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
        setModelOpen(false);
    };

    return (
        <div>

            <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200 flex justify-end">
                    <div className="relative flex">

                        <button
                            onClick={() => setModelOpen(true)}
                            className="inline-flex justify-end items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-blue-700"
                        >
                            <UserPlus className="w-4 h-4 " />
                            Add Customer
                        </button>

                        {modalOpen && (
                            <CustomerForm closeModal={() => setModelOpen(false)} onCustomerAdded={handleCustomerAdded} />
                        )}

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-xl font-medium text-gray-600">
                                                            {customer.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">

                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{customer.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer.email || "No Email"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No customers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Customers;