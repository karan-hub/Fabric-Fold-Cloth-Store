import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart, FaStar, FaRegStar, FaTruck, FaExchangeAlt, FaShieldAlt, FaEye, FaTrash } from 'react-icons/fa';

import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

gsap.registerPlugin(ScrollTrigger);

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [product, setProduct] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const { id } = useParams();
    const productRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                const productData = {...productTemp.data(), id: productTemp.id, rating: (Math.random() * 2 + 3).toFixed(1)};
                setProduct(productData);
                getSuggestedProducts(productData.category);
            } else {
                toast.error("Product not found");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to load product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getSuggestedProducts = async (category) => {
        try {
            const q = query(
                collection(fireDB, "products"),
                where("category", "==", category),
                limit(4)
            );
            const querySnapshot = await getDocs(q);
            const suggestedProductsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(product => product.id !== id);
            setSuggestedProducts(suggestedProductsData);
        } catch (error) {
            console.error("Error fetching suggested products:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    useEffect(() => {
        if (!loading && productRef.current && imageRef.current) {
            gsap.fromTo(
                productRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: productRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                { 
                    scale: 0.8, 
                    opacity: 0, 
                    rotation: -15,
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)"
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 1.5,
                    boxShadow: "10px 10px 20px 0px rgba(0,0,0,0.2)",
                    ease: "elastic.out(1, 0.75)",
                    onComplete: () => {
                        gsap.to(imageRef.current, {
                            y: 10,
                            repeat: -1,
                            yoyo: true,
                            duration: 2,
                            ease: "power1.inOut"
                        });
                    }
                }
            );
        }
    }, [loading, product]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCartHandler = (product) => {
        dispatch(addToCart({ ...product, time: Date.now() }));
        toast.success("Added to cart", {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    const removeFromCartHandler = (product) => {
        dispatch(deleteFromCart(product.id));
        toast.success("Removed from cart", {
            icon: '🗑️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    const addCart = (product) => {
        dispatch(addToCart({ ...product, time: Date.now() }));
        toast.success("Added to cart", {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    const deleteCart = (product) => {
        dispatch(deleteFromCart(product.id));
        toast.success("Removed from cart", {
            icon: '🗑️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-screen">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="py-6 md:py-10 lg:py-20 font-poppins bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={productRef}>
                    <div className="flex flex-col md:flex-row -mx-4">
                        <motion.div 
                            className="w-full md:w-1/2 px-4 mb-6 md:mb-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl group" ref={imageRef}>
                                <img
                                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={product.productImageUrl}
                                    alt={product.title}
                                />
                                <div className="absolute inset-0 bg-pink-300 bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaHeart className="text-white text-5xl md:text-6xl animate-pulse" />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="w-full md:w-1/2 px-4 mt-6 md:mt-0"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="lg:pl-8">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-800 mb-2 leading-tight">
                                    {product.title}
                                </h2>
                                <p className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">
                                    ₹ {product.price.toLocaleString()}
                                </p>
                                <div className="flex items-center mb-4">
                                    <div className="flex text-pink-500 mr-2">
                                        {[...Array(5)].map((_, index) => (
                                            index < Math.floor(product.rating) ? 
                                                <FaStar key={index} className="w-5 h-5" /> :
                                                <FaRegStar key={index} className="w-5 h-5" />
                                        ))}
                                    </div>
                                    <span className="text-pink-600 text-lg">({product.rating}/5)</span>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-pink-700 mb-2">
                                        Description:
                                    </h3>
                                    <p className="text-pink-600 leading-relaxed text-base">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center bg-pink-100 rounded-full px-4 py-2">
                                        <FaTruck className="text-pink-500 mr-2 text-xl" />
                                        <span className="text-pink-700 text-sm">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center bg-pink-100 rounded-full px-4 py-2">
                                        <FaExchangeAlt className="text-pink-500 mr-2 text-xl" />
                                        <span className="text-pink-700 text-sm">30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center bg-pink-100 rounded-full px-4 py-2">
                                        <FaShieldAlt className="text-pink-500 mr-2 text-xl" />
                                        <span className="text-pink-700 text-sm">2-Year Warranty</span>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <AnimatePresence>
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <motion.button 
                                                key="remove"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                onClick={() => removeFromCartHandler(product)}
                                                className="w-full px-6 py-4 text-lg font-bold text-white bg-pink-600 rounded-full hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                                            >
                                                <FaShoppingCart className="mr-2" /> Remove from Cart
                                            </motion.button>
                                        ) : (
                                            <motion.button 
                                                key="add"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                onClick={() => addToCartHandler(product)}
                                                className="w-full px-6 py-4 text-lg font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                                            >
                                                <FaShoppingCart className="mr-2" /> Add to Cart
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-6 py-4 text-lg font-bold text-pink-600 bg-transparent border-2 border-pink-600 rounded-full hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <FaHeart className="mr-2" /> Add to Wishlist
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Suggested Products Section */}
                    {suggestedProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-16"
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold text-pink-800 mb-8">You May Also Like</h3>
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {suggestedProducts.map((suggestedProduct) => {
                                    const { id, title, price, productImageUrl } = suggestedProduct;
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
                                                        {cartItems.some((p) => p.id === suggestedProduct.id) 
                                                            ? <motion.button
                                                                onClick={() => deleteCart(suggestedProduct)}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                                                              >
                                                                <FaTrash className="inline mr-1" /> Remove
                                                              </motion.button>
                                                            : <motion.button
                                                                onClick={() => addCart(suggestedProduct)}
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
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;