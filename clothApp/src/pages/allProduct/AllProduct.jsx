import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTrash, FaSearch, FaFilter, FaEye, FaTimes } from "react-icons/fa";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        newArrivals: false,
        onSale: false,
        categories: {}
    });

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart", {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item.id));
        toast.success("Removed from cart", {
            icon: '🗑️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        const filtered = getAllProduct.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!filters.newArrivals || product.isNewArrival) &&
            (!filters.onSale || product.isOnSale) &&
            (Object.keys(filters.categories).length === 0 || filters.categories[product.category])
        );
        setFilteredProducts(filtered);
    }, [searchTerm, filters, getAllProduct]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, checked, type } = e.target;
        if (type === 'checkbox') {
            if (name === 'newArrivals' || name === 'onSale') {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [name]: checked
                }));
            } else {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    categories: {
                        ...prevFilters.categories,
                        [name]: checked
                    }
                }));
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Get unique categories from products
    const categories = [...new Set(getAllProduct.map(product => product.category))];

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center">
                    Discover Our Collection
                </h1>
                
                <div className="mb-6 flex flex-row justify-between items-center">
                    <div className="relative flex-grow mr-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                            {showFilters ? <FaTimes /> : <FaFilter />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 p-4 bg-white rounded-lg shadow-md"
                        >
                            <h3 className="font-semibold mb-2">Filters</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name="newArrivals"
                                        checked={filters.newArrivals}
                                        onChange={handleFilterChange}
                                        className="form-checkbox text-pink-500" 
                                    />
                                    <span className="ml-2">New Arrivals</span>
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name="onSale"
                                        checked={filters.onSale}
                                        onChange={handleFilterChange}
                                        className="form-checkbox text-pink-500" 
                                    />
                                    <span className="ml-2">On Sale</span>
                                </label>
                                <div>
                                    <h4 className="font-semibold mb-1">Categories:</h4>
                                    {categories.map(category => (
                                        <label key={category} className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                name={category}
                                                checked={filters.categories[category] || false}
                                                onChange={handleFilterChange}
                                                className="form-checkbox text-pink-500" 
                                            />
                                            <span className="ml-2">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredProducts.map((item, index) => {
                        const { id, title, price, productImageUrl } = item;
                        return (
                            <motion.div
                                key={id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={productImageUrl}
                                    alt={title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                                    <p className="text-gray-600 mb-4">Fabric Fold</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-pink-600">₹{price}</span>
                                        <div className="space-x-2">
                                            <motion.button
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                                            >
                                                <FaEye className="inline mr-1" /> View
                                            </motion.button>
                                            {cartItems.some((p) => p.id === item.id) 
                                                ? <motion.button
                                                    onClick={() => deleteCart(item)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                                                  >
                                                    <FaTrash className="inline mr-1" /> Remove
                                                  </motion.button>
                                                : <motion.button
                                                    onClick={() => addCart(item)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                                                  >
                                                    <FaShoppingCart className="inline mr-1" /> Add
                                                  </motion.button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </Layout>
    );
}

export default AllProduct;