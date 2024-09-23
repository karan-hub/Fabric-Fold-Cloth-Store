import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import myContext from "../../context/myContext";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    const logout = () => {
        localStorage.removeItem('users');
        navigate("/login");
    }

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
    };

    const cartItems = useSelector((state) => state.cart);

    const categories = [
        // ... (categories array remains unchanged)
    ];

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Search in categories
        const categoryResults = categories.filter(category =>
            category.name.toLowerCase().includes(term.toLowerCase())
        );

        // Search in product titles
        const productResults = getAllProduct.filter(product =>
            product.title.toLowerCase().includes(term.toLowerCase())
        );

        // Combine and deduplicate results
        const combinedResults = [...categoryResults, ...productResults];
        const uniqueResults = Array.from(new Set(combinedResults.map(a => a.name || a.title)))
            .map(name => {
                return combinedResults.find(a => (a.name || a.title) === name)
            });

        setSearchResults(uniqueResults);
    };

    const navList = (
        <ul className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-7 text-white font-medium text-sm lg:text-md px-5 gap-3 lg:gap-7">
            <li><Link to="/" onClick={toggleNav}>Home</Link></li>
            <li className="text-sm "><Link to="/allproduct" onClick={toggleNav}>Products</Link></li>
            {/* <li className="relative group">
                <span className="cursor-pointer">Categories</span>
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li> */}
            {!user && <li><Link to="/signup" onClick={toggleNav}>Signup</Link></li>}
            {!user && <li><Link to="/login" onClick={toggleNav}>Login</Link></li>}
            {user?.role === "user" && <li><Link to="/user-dashboard" onClick={toggleNav}>User</Link></li>}
            {user?.role === "admin" && <li><Link to="/admin-dashboard" onClick={toggleNav}>Admin</Link></li>}
            {user && <li className="cursor-pointer " onClick={() => { logout(); toggleNav(); }}>Logout</li>}
            <li><Link to="/cart" onClick={toggleNav}>Cart({cartItems.length})</Link></li>
        </ul>
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsNavOpen(false);
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isNavOpen) {
            gsap.fromTo(navRef.current, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.3 });
        } else {
            gsap.to(navRef.current, { x: '-100%', opacity: 0, duration: 0.3 });
        }
    }, [isNavOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            gsap.fromTo(searchRef.current, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.3 });
        } else {
            gsap.to(searchRef.current, { y: '-100%', opacity: 0, duration: 0.3 });
        }
    }, [isSearchOpen]);

    return (
        <div className="w-full sticky top-0 z-50">
            <div className="flex justify-end bg-pink-100 opacity-80  py-2">
                <div className="text-pink-800 mr-20 font-bold text-xs lg:text-sm">
                    <a href="https://wa.me/8390394421">+91 839 0394 421</a>
                </div>
            </div>

            <nav className="bg-pink-600 sticky top-0 z-10">
                <div className="flex items-center justify-between w-full lg:w-4/6 mx-auto py-3 px-4">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center">
                        <h2 className="font-bold text-white text-xl lg:text-2xl whitespace-nowrap">
                            THE FABRIC FOLD
                        </h2>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex space-x-8">
                        {navList}
                    </div>

                    {/* Search Input (Visible on larger screens) */}
                    <div className="hidden ml-24 lg:flex items-center relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            value={searchTerm}
                            onChange={handleSearch}
                        />

                        {searchTerm && searchResults.length > 0 && (
                            <div className="absolute top-full right-0 w-64 bg-white shadow-md mt-1 rounded-md max-h-60 overflow-y-auto z-20">
                                {searchResults.map((result, index) => (
                                    <Link
                                        key={index}
                                        to={result.name ? `/category/${result.name.toLowerCase().replace(/\s+/g, '-')}` : `/productinfo/${result.id}`}
                                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        <img src={result.image || result.productImageUrl} alt={result.name || result.title} className="w-8 h-8 mr-2 object-cover rounded-full" />
                                        <span>{result.name || result.title}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Navigation Toggle (Visible on small screens) */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button onClick={toggleSearch} className="text-white focus:outline-none" aria-label="Toggle Search">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        {isSearchOpen && (
                            <div className="absolute top-full right-0 w-full bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg mt-3 rounded-md z-20 transition-transform transform scale-100 opacity-100 animate-fadeIn p-4">
                                <div className=" flex-row-reverse flex w-full" onClick={() => {
                                    setSearchTerm("");
                                    setIsSearchOpen(false); // Hide search again when a result is clicked
                                }}> 
                                <h1 className="text-white font-bold cursor-pointer ">Cancle</h1></div>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-700 transition duration-300 ease-in-out shadow-md"
                                    value={searchTerm}
                                    onChange={handleSearch}

                                />

                                {searchTerm && searchResults.length > 0 && (
                                    <div className="max-h-60 overflow-y-auto mt-2 rounded-md bg-white shadow-lg">

                                        {searchResults.map((result, index) => (
                                            <Link
                                                key={index}
                                                to={result.name ? `/category/${result.name.toLowerCase().replace(/\s+/g, '-')}` : `/productinfo/${result.id}`}
                                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-200 transition duration-200 ease-in-out rounded-md"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setIsSearchOpen(false); // Hide search again when a result is clicked
                                                }}
                                            >
                                                <img src={result.image || result.productImageUrl} alt={result.name || result.title} className="w-10 h-10 mr-2 object-cover rounded-full border-2 border-white shadow-sm" />
                                                <span className="font-semibold">{result.name || result.title}</span>

                                            </Link>
                                        ))}

                                    </div>
                                )}
                            </div>
                        )}


                        <button onClick={toggleNav} className="text-white focus:outline-none" aria-label="Toggle Navigation">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                </div>

                {/* Mobile Navigation Drawer */}
                <div ref={navRef} className={`lg:hidden fixed top-0 left-0 w-72 h-full bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 z-[100] transform ${isNavOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
                    <div className="p-6 relative overflow-hidden">
                        <button onClick={toggleNav} className="text-white mb-6 hover:text-pink-200 transition-colors duration-200">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="space-y-5">
                            {navList}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
