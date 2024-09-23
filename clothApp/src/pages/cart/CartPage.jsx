import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash2, Plus, Minus } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item.id));
        toast.success("Item removed from cart")
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const user = JSON.parse(localStorage.getItem('users'))

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const buyNowFunction = () => {
        if (Object.values(addressInfo).some(field => field === "")) {
            return toast.error("All fields are required")
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        }

        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfully")
        } catch (error) {
            console.error("Error placing order:", error)
            toast.error("Failed to place order. Please try again.")
        }
    }

    return (
        <Layout>
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-10 text-center">
                        Your Fabulous Cart
                    </h1>
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
                        <section aria-labelledby="cart-heading" className="lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="space-y-6">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category } = item
                                        return (
                                            <li key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                                <div>
                                                    <div className="flex p-3 m-4">
                                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-lg">
                                                            <img
                                                                src={productImageUrl}
                                                                alt={title}
                                                                className="w-full h-full object-cover object-center"
                                                                loading="lazy"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col w-full justify-between items-start sm:items-center">
                                                            <div className="flex flex-col w-full justify-between gap-4 p-4 sm:p-6">
                                                                <div className="flex flex-col w-full mb-4 sm:mb-0">
                                                                    <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-tight sm:text-2xl">{title}</h3>
                                                                    <p className="text-xs text-pink-600 font-medium uppercase tracking-wide bg-pink-200 inline-block px-2 py-1 rounded-full sm:text-sm">{category}</p>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex flex-col">
                                                                        <p className="text-lg font-bold text-pink-600 sm:text-2xl">₹{price}</p>
                                                                        <p className="text-xs text-gray-500 sm:text-sm">per item</p>
                                                                    </div>
                                                                    <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDecrement(id)}
                                                                            className="p-1 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 sm:p-2"
                                                                            aria-label="Decrease quantity"
                                                                        >
                                                                            <Minus size={14} />
                                                                        </button>
                                                                        <input
                                                                            type="text"
                                                                            name="quantity"
                                                                            id={`quantity-${id}`}
                                                                            value={quantity}
                                                                            readOnly
                                                                            className="w-8 h-8 text-center text-base font-semibold border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mx-2 sm:w-14 sm:h-10 sm:text-lg"
                                                                            aria-label={`Quantity for ${title}`}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleIncrement(id)}
                                                                            className="p-1 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 sm:p-2"
                                                                            aria-label="Increase quantity"
                                                                        >
                                                                            <Plus size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full  sm:px-6 mt-4 sm:mt-0">
                                                                <button
                                                                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                                                                    onClick={() => deleteCart(item)}
                                                                    type="button"
                                                                >
                                                                    <Trash2 className="mr-2" size={16} /> Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                                        <h2 className="text-2xl font-bold text-pink-600 mb-4">Your cart is empty</h2>
                                        <p className="text-lg text-pink-500">Add some fabulous items to your cart to get started!</p>
                                    </div>
                                )}
                            </ul>
                        </section>
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-2xl bg-white shadow-xl lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className="border-b border-pink-200 px-4 py-5 text-lg font-medium text-pink-900 sm:px-6"
                            >
                                Order Summary
                            </h2>
                            <div className="px-4 py-6 sm:p-6 lg:p-8">
                                <dl className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-pink-600">Subtotal ({cartItemTotal} item{cartItemTotal !== 1 ? 's' : ''})</dt>
                                        <dd className="text-sm font-medium text-pink-900">₹ {cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-pink-200 pt-4">
                                        <dt className="flex items-center text-sm text-pink-600">
                                            <span>Shipping</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-pink-200 pt-4">
                                        <dt className="text-base font-medium text-pink-900">Order total</dt>
                                        <dd className="text-base font-medium text-pink-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="mt-6">
                                    {user ? (
                                        <BuyNowModal
                                            addressInfo={addressInfo}
                                            setAddressInfo={setAddressInfo}
                                            buyNowFunction={buyNowFunction}
                                        />
                                    ) : (
                                        <Navigate to={'/login'} />
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;