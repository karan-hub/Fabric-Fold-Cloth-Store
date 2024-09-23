import React, { useContext } from "react";
import myContext from "../../context/myContext";
import { motion } from "framer-motion";

const OrderDetail = () => {
    const { getAllOrder, deleteProduct } = useContext(myContext);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold text-pink-600 mb-6">Order Details</h1>
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="lg:hidden">
                    {getAllOrder.map((order) => (
                        <div key={order.id} className="p-4 border-b border-pink-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm">Order ID: {order.id.slice(0, 8)}...</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                                    order.status === 'processing' ? 'bg-yellow-200 text-yellow-800' :
                                    'bg-red-200 text-red-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="mb-2">
                                {order.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-1">
                                        <img src={item.productImageUrl} alt={item.title} className="w-10 h-10 object-cover rounded" />
                                        <span className="text-sm">{item.title} (x{item.quantity})</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold">Total: ₹{order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                                <button
                                    onClick={() => deleteProduct(order.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="text-sm">
                                <p>{order.addressInfo.name}</p>
                                <p className="text-gray-500">{order.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-pink-100 text-pink-600">
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllOrder.map((order) => (
                                <tr key={order.id} className="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                                    <td className="px-4 py-2 text-sm">{order.id.slice(0, 8)}...</td>
                                    <td className="px-4 py-2">
                                        {order.cartItems.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2 mb-1">
                                                <img src={item.productImageUrl} alt={item.title} className="w-10 h-10 object-cover rounded" />
                                                <span className="text-sm">{item.title} (x{item.quantity})</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 font-semibold">
                                        ₹{order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                                            order.status === 'processing' ? 'bg-yellow-200 text-yellow-800' :
                                            'bg-red-200 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="text-sm">
                                            <p>{order.addressInfo.name}</p>
                                            <p className="text-gray-500">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteProduct(order.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}

export default OrderDetail;