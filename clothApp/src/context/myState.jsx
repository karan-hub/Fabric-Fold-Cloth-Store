/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // Data State
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUsers, setGetAllUsers] = useState([]);

    /**========================================================================
     *                          GET All Product Function
     *========================================================================**/
    const getAllProductFunction = () => {
        setLoading(true);
        const q = query(collection(fireDB, "products"), orderBy('time'));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllProduct(productArray);
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });
        return unsubscribe; // Return the unsubscribe function
    };

    /**========================================================================
     *                           GET All Order Function
     *========================================================================**/
    const getAllOrderFunction = () => {
        setLoading(true);
        const q = query(collection(fireDB, "order"), orderBy('time'));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let orderArray = [];
            QuerySnapshot.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllOrder(orderArray);
            setLoading(false);
            console.table(orderArray)
        }, (error) => {
            console.error(error);
            setLoading(false);
        });
        return unsubscribe; // Return the unsubscribe function
    };

    /**========================================================================
     *                           GET All Users Function
     *========================================================================**/
    const getAllUsersFunction = () => {
        setLoading(true);
        const q = query(collection(fireDB, "user"), orderBy('time'));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let usersArray = [];
            QuerySnapshot.forEach((doc) => {
                usersArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllUsers(usersArray);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users: ", error.message);
            setLoading(false);
        });
        return unsubscribe;
    };

    // Delete order Function
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribeProduct = getAllProductFunction();
        const unsubscribeOrder = getAllOrderFunction();
        const unsubscribeUser = getAllUsersFunction();

        // Cleanup function: Unsubscribe from all listeners on unmount
        return () => {
            unsubscribeProduct();
            unsubscribeOrder();
            unsubscribeUser();
        };
    }, []); // Empty array to run only on mount and unmount

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllOrder,
            getAllUsers,
            deleteProduct,
            getAllProductFunction,
            getAllOrderFunction,
            getAllUsersFunction
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
