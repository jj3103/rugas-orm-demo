import React, { useEffect } from 'react';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { getAllProducts } from '../services/api.js'

function Products() {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = ["all", "commercial", "household", "electronics"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(selectedCategory === "all" ? "" : selectedCategory);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };

        fetchProducts();
    }, [selectedCategory]);



    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200 flex justify-end">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            className="border rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white border rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;