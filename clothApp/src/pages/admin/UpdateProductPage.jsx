import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
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

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    // navigate 
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
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

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            //   console.log(product.data())
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', id), product)
            toast.success("Product Updated successfully")
            getAllProductFunction();
            setLoading(false)
            navigate('/admin-dashboard')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleProductFunction();
    }, []);
    return (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen flex justify-center items-center p-4">
            <div className='flex flex-col md:flex-row gap-4 max-w-3xl w-full'>
                {loading && <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"><Loader /></div>}
                <div className="text-4xl md:text-6xl flex flex-col font-playwrite gap-2 pl-2 items-start justify-center rounded-lg w-full md:w-1/3 text-custom-pink bg-white font-extrabold text-center py-4">
                    <h1>THE</h1>
                    <h1>Fabric</h1>
                    <h1>Fold</h1>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-2/3">
                    <div className="px-4 md:px-6 py-4">
                        <h2 className='text-center text-xl md:text-2xl font-bold text-purple-600 mb-6'>
                            Update Product
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
                                onClick={updateProduct}
                                type='button'
                                className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 transition duration-300'
                            >
                                Update Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;