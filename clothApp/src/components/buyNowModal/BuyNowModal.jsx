/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaShoppingBag, FaArrowLeft, FaCheck } from "react-icons/fa";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-semibold text-white bg-pink-500 border-2 border-transparent transition-all duration-300 hover:bg-pink-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
            >
                <FaShoppingBag className="mr-2" /> Buy Now
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-white rounded-3xl shadow-2xl max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                size="xs"
                position="center"
            >
                <DialogBody className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-6 sm:mb-8 text-center">Complete Your Purchase</h2>
                    {["name", "address", "pincode", "mobileNumber"].map((field) => (
                        <div key={field} className="mb-4 sm:mb-6">
                            <Input
                                type={field === "pincode" ? "number" : "text"}
                                name={field}
                                value={addressInfo[field]}
                                onChange={handleInputChange}
                                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                className="w-full text-pink-500 placeholder-pink-300 border-b-2 border-pink-300 focus:border-pink-500 transition-all duration-300 bg-transparent"
                                labelProps={{
                                    className: "text-pink-500",
                                }}
                                containerProps={{
                                    className: "h-11",
                                }}
                            />
                        </div>
                    ))}
                    <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-4">
                        <Button
                            type="button"
                            onClick={handleOpen}
                            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-pink-400 border-2 border-pink-500 transition-all duration-300 hover:bg-pink-300 rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                            <FaArrowLeft className="mr-2" /> Back
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-pink-500 transition-all duration-300 hover:bg-pink-600 rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                            Confirm Purchase <FaCheck className="ml-2" />
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;