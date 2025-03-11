import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/api.js'

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(formData)
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-red-400">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-3 text-center">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
