import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react";

function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Dashboard", icon: LayoutDashboard },
        { path: "/customers", label: "Customers", icon: Users },
        { path: "/products", label: "Products", icon: Package },
        { path: "/orders", label: "Orders", icon: ShoppingCart },
    ];

    return (
        <nav className="bg-gray-300 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side - Nav Items */}
                    <div className="flex items-center space-x-4">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${location.pathname === path
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Sign Up & Login */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600  hover:bg-gray-100"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
