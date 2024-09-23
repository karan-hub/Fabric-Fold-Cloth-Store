import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required", { icon: '🚫' });
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            const q = query(collection(fireDB, "user"), where('uid', '==', users?.user?.uid));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({ email: "", password: "" });
                toast.success("Login Successful", { icon: '🎉' });
                setLoading(false);
                navigate(user.role === "user" ? '/user-dashboard' : '/admin-dashboard');
            });
            return () => unsubscribe();
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Login Failed", { icon: '😞' });
        }
    };

    return (
        <div className='flex justify-center bg-pink-200 items-center min-h-screen'>
            {loading && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"><Loader /></div>}
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white  shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4 backdrop-filter backdrop-blur-lg">
                    <div className="mb-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FaUserCircle className="mx-auto text-6xl text-pink-600" />
                        </motion.div>
                        <h2 className='text-3xl font-extrabold text-gray-900 mt-4'>
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <motion.div 
                        className="mb-6 relative"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-pink-500" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email Address'
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                            className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition duration-300 ease-in-out hover:border-pink-400'
                        />
                    </motion.div>

                    <motion.div 
                        className="mb-6 relative"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-pink-500" />
                        </div>
                        <input
                            type="password"
                            placeholder='Password'
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition duration-300 ease-in-out hover:border-pink-400'
                        />
                    </motion.div>

                    <motion.div 
                        className="mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <button
                            type='button'
                            onClick={userLoginFunction}
                            className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                        >
                            { 'Sign In'}
                        </button>
                    </motion.div>

                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link className='font-medium text-pink-600 hover:text-pink-500 transition duration-300 ease-in-out' to={'/signup'}>
                                Sign up
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;