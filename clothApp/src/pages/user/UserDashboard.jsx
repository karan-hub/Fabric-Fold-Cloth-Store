import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { FaUser, FaEnvelope, FaCalendarAlt, FaUserTag, FaShoppingBag, FaMoneyBillWave, FaClipboardCheck } from 'react-icons/fa';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* User Profile */}
                <div className=" bg-pink-600 rounded-xl shadow-2xl p-8 mb-12 text-white">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-pink-200 shadow-lg" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-4 text-pink-100">{user?.name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center bg-pink-900 bg-opacity-30 rounded-lg p-3">
                                    <FaEnvelope className="text-pink-200 mr-3 text-xl" />
                                    <span className="text-lg">{user?.email}</span>
                                </div>
                                <div className="flex items-center bg-pink-900 bg-opacity-30 rounded-lg p-3">
                                    <FaCalendarAlt className="text-pink-200 mr-3 text-xl" />
                                    <span className="text-lg">{user?.date}</span>
                                </div>
                                <div className="flex items-center bg-pink-900 bg-opacity-30 rounded-lg p-3">
                                    <FaUserTag className="text-pink-200 mr-3 text-xl" />
                                    <span className="text-lg">{user?.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center">
                        <FaShoppingBag className="mr-4 text-pink-500" />
                        Order Details
                    </h2>

                    {loading && (
                        <div className="flex justify-center my-12">
                            <Loader />
                        </div>
                    )}

                    {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, orderIndex) => (
                        <div key={orderIndex} className="mb-12 last:mb-0">
                            {order.cartItems.map((item, itemIndex) => {
                                const { id, date, quantity, price, title, productImageUrl, category } = item;
                                const { status } = order;
                                return (
                                    <div key={itemIndex} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl hover:scale-102">
                                        <div className="md:flex">
                                            <div className="p-6 md:w-1/3 bg-gradient-to-br from-purple-100 to-pink-100">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <div className="text-sm font-semibold text-gray-600 mb-1">Order ID</div>
                                                        <div className="text-lg font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                                                            #{id.length > 8 ? `${id.substring(0, 8)}...` : id}
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <div className="text-sm font-semibold text-gray-600 mb-1">Date</div>
                                                        <div className="text-lg font-medium text-gray-900">{date}</div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <div className="text-sm font-semibold text-gray-600 mb-1">Total Amount</div>
                                                        <div className="text-lg font-medium text-gray-900 flex items-center">
                                                            <FaMoneyBillWave className="mr-2 text-green-500" />
                                                            ₹ {price * quantity}
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <div className="text-sm font-semibold text-gray-600 mb-1">Status</div>
                                                        <div className="text-lg font-medium text-green-600 flex items-center">
                                                            <FaClipboardCheck className="mr-2" />
                                                            {status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 md:w-2/3">
                                                <div className="flex flex-col md:flex-row items-center">
                                                    <img
                                                        className="w-40 h-40 object-contain rounded-xl border border-gray-200 mb-6 md:mb-0 md:mr-8 shadow-md"
                                                        src={productImageUrl}
                                                        alt={title}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                                                        <p className="text-lg text-gray-600 mb-2">{category}</p>
                                                        <p className="text-xl font-medium text-gray-800 bg-gray-100 inline-block px-3 py-1 rounded-full">₹ {price} x {quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;