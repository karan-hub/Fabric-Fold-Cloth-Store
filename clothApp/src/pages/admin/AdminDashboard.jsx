import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import myContext from '../../context/myContext';
import { FaBox, FaClipboardList, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const { getAllProduct, getAllOrder } = useContext(myContext);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
        >
            <motion.div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8"
                variants={fadeIn}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Admin Dashboard</h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <motion.div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    variants={fadeIn}
                >
                    <div className="flex flex-col items-center">
                        <img 
                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"} 
                            alt="User" 
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.name}</h2>
                        <p className="text-gray-600 mb-1">{user?.email}</p>
                        <p className="text-gray-600 mb-1">Joined: {new Date(user?.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 font-semibold">{user?.role}</p>
                    </div>
                </motion.div>

                <motion.div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    variants={fadeIn}
                >
                    <Tabs>
                        <TabList className="flex space-x-4 mb-6">
                            <Tab className="flex-1 py-2 px-4 text-center bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">Products</Tab>
                            <Tab className="flex-1 py-2 px-4 text-center bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">Orders</Tab>
                            <Tab className="flex-1 py-2 px-4 text-center bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">Users</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="flex items-center justify-center bg-pink-50 p-6 rounded-lg">
                                <FaBox className="text-5xl text-pink-500 mr-4" />
                                <div>
                                    <h3 className="text-3xl font-bold text-pink-600">{getAllProduct.length}</h3>
                                    <p className="text-lg text-pink-500">Total Products</p>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="flex items-center justify-center bg-purple-50 p-6 rounded-lg">
                                <FaClipboardList className="text-5xl text-purple-500 mr-4" />
                                <div>
                                    <h3 className="text-3xl font-bold text-purple-600">{getAllOrder.length}</h3>
                                    <p className="text-lg text-purple-500">Total Orders</p>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="flex items-center justify-center bg-indigo-50 p-6 rounded-lg">
                                <FaUsers className="text-5xl text-indigo-500 mr-4" />
                                <div>
                                    <h3 className="text-3xl font-bold text-indigo-600">10</h3>
                                    <p className="text-lg text-indigo-500">Total Users</p>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </motion.div>
            </div>

            <motion.div 
                className="bg-white rounded-lg shadow-lg p-6"
                variants={fadeIn}
            >
                <Tabs>
                    <TabList className="flex flex-wrap mb-6">
                        <Tab className="mr-2 mb-2 py-2 px-4 bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">Product Details</Tab>
                        <Tab className="mr-2 mb-2 py-2 px-4 bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">Order Details</Tab>
                        <Tab className="mr-2 mb-2 py-2 px-4 bg-pink-100 text-pink-600 rounded-lg cursor-pointer transition-colors hover:bg-pink-200">User Details</Tab>
                    </TabList>

                    <TabPanel>
                        <ProductDetail />
                    </TabPanel>

                    <TabPanel>
                        <OrderDetail />
                    </TabPanel>

                    <TabPanel>
                        <UserDetail />
                    </TabPanel>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}

export default AdminDashboard;