import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'Dresses' },
    { name: 'Skirts' },
    { name: 'Blouses' },
    { name: 'Women\'s Tops' },
    { name: 'Women\'s Jeans' },
    { name: 'Women\'s Pants' },
    { name: 'Women\'s Shorts' },
    { name: 'Women\'s Jackets' },
    { name: 'Women\'s Sweaters' },
    { name: 'Women\'s Coats' },
    { name: 'Women\'s Activewear' },
    { name: 'Women\'s Swimwear' },
    { name: 'Women\'s Lingerie' },
    { name: 'Women\'s Sleepwear' },
    { name: 'Women\'s Accessories' },
    { name: 'Women\'s Shoes' },
    { name: 'Women\'s Bags' },
    { name: 'Women\'s Jewelry' },
    { name: 'Women\'s Scarves' },
    { name: 'Women\'s Belts' }
]

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
            return toast.error("All fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Product added successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Failed to add product");
        }
    }

    return (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen flex justify-center items-center p-4">
            <div className='flex flex-col md:flex-row gap-4 max-w-3xl w-full'>
                {loading && <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"><Loader /></div>}
                <div className="text-4xl md:text-6xl flex flex-col font-playwrite gap-2 pl-2 items-start justify-center rounded-lg w-full md:w-1/3 text-custom-pink bg-white font-extrabold text-center py-4">
                    <h1>THE </h1>
                    <h1>Fabric</h1>
                    <h1>Fold</h1>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-2/3">
                    <div className="px-4 md:px-6 py-4">
                        <h2 className='text-center text-xl md:text-2xl font-bold text-purple-600 mb-6'>
                            Add New Product
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={(e) => setProduct({...product, title: e.target.value})}
                                placeholder='Product Title'
                                className='w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-300'
                            />

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                                placeholder='Product Price'
                                className='w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-300'
                            />

                            <input
                                type="text"
                                name="productImageUrl"
                                value={product.productImageUrl}
                                onChange={(e) => setProduct({...product, productImageUrl: e.target.value})}
                                placeholder='Product Image URL'
                                className='w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-300'
                            />

                            <select
                                value={product.category}
                                onChange={(e) => setProduct({...product, category: e.target.value})}
                                className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700">
                                <option value="" disabled>Select Product Category</option>
                                {categoryList.map((value, index) => (
                                    <option key={index} value={value.name}>{value.name}</option>
                                ))}
                            </select>

                            <textarea
                                value={product.description}
                                onChange={(e) => setProduct({...product, description: e.target.value})}
                                name="description"
                                placeholder="Product Description"
                                rows="4"
                                className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-300"
                            ></textarea>

                            <button
                                onClick={addProductFunction}
                                type='button'
                                className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 transition duration-300'
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;