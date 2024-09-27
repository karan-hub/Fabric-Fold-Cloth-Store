import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/myContext';
import { motion } from "framer-motion";
import { gsap } from "gsap";

const UserDetail = () => {
    const { getAllUsers, getAllUsersFunction } = useContext(MyContext);
    const [sortOption, setSortOption] = useState('name');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        getAllUsersFunction();
    }, []);

    useEffect(() => {
        setFilteredUsers(getAllUsers);
    }, [getAllUsers]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // Sort users based on selected option
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'email') {
            return a.email.localeCompare(b.email);
        } else if (sortOption === 'addedTime') {
            return b.time.seconds - a.time.seconds;
        }
        return 0;
    });

    const categorizeUsers = (users) => {
        const now = new Date();
        const categorized = {
            'This Week': [],
            'This Month': [],
            'Older': []
        };

        users.forEach(user => {
            const userAddedDate = new Date(user.time.seconds * 1000);
            const diffInDays = Math.floor((now - userAddedDate) / (1000 * 60 * 60 * 24));
            
            if (diffInDays <= 7) {
                categorized['This Week'].push(user);
            } else if (diffInDays <= 30) {
                categorized['This Month'].push(user);
            } else {
                categorized['Older'].push(user);
            }
        });

        return categorized;
    };

    const categorizedUsers = categorizeUsers(sortedUsers);

    useEffect(() => {
        gsap.fromTo(".user-detail", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.inOut" });
    }, [categorizedUsers]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="user-detail flex flex-col items-center p-8 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 min-h-screen"
        >
            <div className="w-full max-w-3xl space-y-12">
                <div className="text-center mb-8 max-w-3xl bg-white rounded-2xl shadow-xl p-6 transform hover:scale-102 transition-all duration-300 border-2 border-pink-300">
                    <h1 className="text-4xl font-extrabold text-pink-600 mb-2 tracking-tight leading-tight">
                        Users Details
                    </h1>
                    <p className="text-lg text-pink-300  font-bold">Manage and explore your user base</p>
                </div>
                
                <div className="flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
                    <div className="w-1/2">
                        <p className="text-2xl text-white font-semibold">Manage Your Users</p>
                    </div>
                    <div className="w-1/3">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="w-full p-4 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent bg-white text-pink-600 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl text-lg"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="email">Sort by Email</option>
                            <option value="addedTime">Sort by Added Time</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl space-y-12">
                {Object.keys(categorizedUsers).map((category) => (
                    <div key={category} className="mb-10">
                        <h2 className="text-5xl font-bold text-white mb-6 text-center">{category}</h2>
                        {categorizedUsers[category].length > 0 ? (
                            <div className="space-y-6">
                                {categorizedUsers[category].map(user => {
                                    const userAddedDate = new Date(user.time.seconds * 1000);
                                    return (
                                        <motion.div
                                            key={user.id}
                                            className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
                                            whileHover={{ scale: 1.03 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-4xl font-bold text-pink-600 mb-4">{user.name}</h3>
                                            <p className="text-xl text-gray-700 mb-4 flex items-center">
                                                <i className="fas fa-envelope mr-3 text-pink-500"></i>{user.email}
                                            </p>
                                            <p className="text-lg text-gray-500 italic flex items-center">
                                                <i className="fas fa-calendar-alt mr-3 text-pink-400"></i>
                                                Added on: {userAddedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-2xl text-white text-center italic">No users found</p>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default UserDetail;
