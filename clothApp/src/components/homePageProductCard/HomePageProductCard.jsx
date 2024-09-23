import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const cardsRef = useRef([]);

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        const serializedItem = {
            ...item,
            time: Date.now()
        };
        dispatch(addToCart(serializedItem));
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
        const cards = cardsRef.current;
        
        const animations = cards.map((card, index) => {
            return gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        end: "top center",
                        toggleActions: "play none none reverse",
                        scrub: 1
                    }
                }
            );
        });

        return () => {
            animations.forEach(animation => {
                if (animation.scrollTrigger) {
                    animation.scrollTrigger.kill();
                }
            });
        };
    }, [getAllProduct]);

    return (
        <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 py-10 px-4 sm:px-6 lg:px-8">
            {/* Heading  */}
            <div className="mb-12">
                <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Bestselling Products</h1>
                <p className="text-center text-gray-600">Discover our most loved items</p>
                <div className="w-24 h-1 bg-pink-500 mx-auto mt-4"></div>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.slice(0,8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item
                            return (
                                <motion.div 
                                    key={index} 
                                    className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" 
                                    ref={el => cardsRef.current[index] = el}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
                                        <div className="relative">
                                            <img
                                                onClick={()=> navigate(`/productinfo/${id}`)}
                                                className="h-64 w-full object-cover object-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                            <div className="absolute top-0 right-0 bg-pink-500 text-white px-2 py-1 m-2 rounded-full text-xs font-bold">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-pink-500 mb-1">
                                                Fabric Fold
                                            </h2>
                                            <h1 className="title-font text-lg font-semibold text-gray-900 mb-3">
                                                {title.length > 25 ? `${title.substring(0, 25)}...` : title}
                                            </h1>
                                            <p className="text-2xl font-bold text-pink-600 mb-3">
                                                ₹{price}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <button
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    className="text-pink-500 hover:text-pink-600 transition-colors duration-300"
                                                >
                                                    View Details
                                                </button>
                                                {cartItems.some((p) => p.id === item.id) 
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full font-bold transition-colors duration-300 flex items-center justify-center text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove
                                                </button>
                                                : 
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full font-bold transition-colors duration-300 flex items-center justify-center text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add to Cart
                                                </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;
