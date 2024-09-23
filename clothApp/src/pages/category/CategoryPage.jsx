import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTrash, FaSearch, FaHeart, FaStar } from 'react-icons/fa';

import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const filterProduct = getAllProduct.filter((obj) => 
        obj.category.toLowerCase().includes(categoryname.toLowerCase()) &&
        obj.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addCart = (item) => {
        const serializedItem = {
            ...item,
            time: item.time && typeof item.time.toMillis === 'function' ? item.time.toMillis() : Date.now()
        };
        dispatch(addToCart(serializedItem));
        toast.success("Added to cart");
        updateNavbar();
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item.id));
        toast.success("Removed from cart");
        updateNavbar();
    }

    const updateNavbar = () => {
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToWishlist = (item) => {
        // Implement wishlist functionality here
        toast.success("Added to wishlist");
    }

    return (
        <Layout>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10 text-4xl md:text-5xl font-extrabold text-pink-600 capitalize"
                    >
                        {categoryname}
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8 max-w-md mx-auto"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-full border-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors duration-300"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400" />
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <AnimatePresence>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                            >
                                {filterProduct.length > 0 ? (
                                    filterProduct.map((item) => {
                                        const { id, title, price, productImageUrl, rating } = item;
                                        const isInCart = cartItems.some((p) => p.id === id);
                                        return (
                                            <motion.div 
                                                key={id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                                            >
                                                <div className="relative overflow-hidden group h-64">
                                                    <img
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        src={productImageUrl}
                                                        alt={title}
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button 
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="bg-white text-gray-900 py-2 px-4 rounded-full font-bold hover:bg-gray-100 transition duration-300"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{title}</h3>
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="text-xl font-bold text-pink-600">₹{price.toLocaleString()}</span>
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, index) => (
                                                                <FaStar key={index} className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                            ))}
                                                            <span className="ml-1 text-sm text-gray-600">({rating})</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button 
                                                            onClick={() => isInCart ? deleteCart(item) : addCart(item)}
                                                            className={`flex-1 py-2 px-3 rounded-full text-sm font-semibold text-white ${isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'} transition duration-300`}
                                                        >
                                                            {isInCart ? <><FaTrash className="inline mr-1" /> Remove</> : <><FaShoppingCart className="inline mr-1" /> Add to Cart</>}
                                                        </button>
                                                        <button 
                                                            onClick={() => addToWishlist(item)}
                                                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
                                                        >
                                                            <FaHeart className="text-pink-500 w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="col-span-full text-center"
                                    >
                                        <img className="mx-auto mb-6 w-32 h-32 opacity-50" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products found" />
                                        <h1 className="text-gray-600 text-2xl font-semibold">No {categoryname} products found</h1>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default CategoryPage;