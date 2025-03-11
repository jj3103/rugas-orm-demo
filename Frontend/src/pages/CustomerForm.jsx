import React, { useState } from "react";
import { Save, X } from "lucide-react";
import { customerCreate } from '../services/api.js'

function CustomerForm({ closeModal, onCustomerAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            const response = await customerCreate(formData)
            onCustomerAdded(response);
            closeModal(false);
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "Customer creation failed!!")
        }
    };




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Add New Customer</h2>
                    <button onClick={closeModal}>
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full p-2 border rounded-md"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full p-2 border rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="w-full p-2 border rounded-md"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        required
                        className="w-full p-2 border rounded-md"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            <Save className="w-4 h-4 mr-2 inline" />
                            Save Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerForm;
