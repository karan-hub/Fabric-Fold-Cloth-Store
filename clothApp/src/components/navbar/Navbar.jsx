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
        <ul className="lg:flex lg:flex-row space-y-3 lg:space-y-0 lg:space-x-7 text-white font-medium text-md px-5 gap-3 lg:gap-7">
            <li><Link to="/" onClick={toggleNav}>Home</Link></li>
            <li><Link to="/allproduct" onClick={toggleNav}>All Product</Link></li>
            <li className="relative group">
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
            </li>
            {!user && <li><Link to="/signup" onClick={toggleNav}>Signup</Link></li>}
            {!user && <li><Link to="/login" onClick={toggleNav}>Login</Link></li>}
            {user?.role === "user" && <li><Link to="/user-dashboard" onClick={toggleNav}>User</Link></li>}
            {user?.role === "admin" && <li><Link to="/admin-dashboard" onClick={toggleNav}>Admin</Link></li>}
            {user && <li className="cursor-pointer" onClick={() => { logout(); toggleNav(); }}>Logout</li>}
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
            <div className="flex bg-pink-100  opacity-80 justify-center py-2">
                <div className="w-full lg:w-4/6 flex justify-end pr-5 text-pink-800 font-bold text-sm">
                    <a href="tel:+19848505824">+19 8485 0582 84</a>
                </div>
            </div>

            <nav className="bg-pink-600 sticky top-0 z-10 flex justify-center">
                <div className="w-full lg:w-4/6 flex flex-row lg:justify-between items-center py-3 lg:px-3 gap-5">
                    <div className="text-center lg:text-left w-full lg:w-auto">
                        <Link to="/">
                            <h2 className="font-bold text-white text-2xl">Fabric Fold</h2>
                        </Link>
                    </div>

                    <div className="hidden lg:block">{navList}</div>

                    <div className="hidden lg:flex items-center relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="px-4 py-2 rounded-l-md focus:outline-none"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="bg-white text-pink-600 px-4 py-2 rounded-r-md hover:bg-pink-100 transition duration-300">
                            Search
                        </button>

                        {searchTerm && (
                            <div className="absolute top-full right-0 w-64 bg-white shadow-md mt-1 rounded-md max-h-60 overflow-y-auto">
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

                    <div className="lg:hidden flex justify-end w-full pr-5 space-x-4">
                        <button onClick={toggleSearch} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button onClick={toggleNav} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div ref={navRef} className={`lg:hidden fixed top-0 left-0 w-72 h-full bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 z-[100] transform ${isNavOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
                    <div className="p-6 relative overflow-hidden">
                        <button onClick={toggleNav} className="text-white mb-6 hover:text-pink-200 transition-colors duration-200 relative z-10">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="space-y-5 relative z-10">
                            {navList}
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-pink-300 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-300 rounded-full animate-pulse animation-delay-1000"></div>
                            <div className="absolute top-2/3 left-1/3 w-16 h-16 bg-indigo-300 rounded-full animate-pulse animation-delay-2000"></div>
                        </div>
                    </div>
                </div>
                <div ref={searchRef} className={`lg:hidden fixed top-0 left-0 w-full bg-white z-[100] transform ${isSearchOpen ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
                    <div className="p-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow px-4 py-2 rounded-l-md focus:outline-none border border-gray-300"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button onClick={toggleSearch} className="bg-pink-600 text-white px-4 py-2 rounded-r-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {searchTerm && (
                        <div className="bg-white shadow-md max-h-60 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <Link 
                                    key={index} 
                                    to={result.name ? `/category/${result.name.toLowerCase().replace(/\s+/g, '-')}` : `/productinfo/${result.id}`}
                                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => { setSearchTerm(""); toggleSearch(); }}
                                >
                                    <img src={result.image || result.productImageUrl} alt={result.name || result.title} className="w-8 h-8 mr-2 object-cover rounded-full" />
                                    <span>{result.name || result.title}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                {(isNavOpen || isSearchOpen) && <div className="fixed inset-0 bg-black opacity-50 z-[90]" onClick={() => { setIsNavOpen(false); setIsSearchOpen(false); }}></div>}
            </nav>
        </div>
    );
};

export default Navbar;
