import axios from "axios";
import React, {useState} from "react";
const apiUrl = import.meta.env.VITE_API_URL;


function AddCustomerPopup({isOpen, onClose, onSubmit}) {
    const [formData, setFormData] = useState({
        customerName: "",
        cardNumber: "",
        boxNumber: "",
        phoneNumber: "",
        street: "",
        company: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitSaveCustomer = async () => {
        if (!formData.customerName || !formData.cardNumber || !formData.boxNumber || !formData.company) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/users/Addcustomer`, formData);
            if (response.status == 200) {
                alert("Customer added successfully!");
                onClose(); // Close popup after success
            }
        } catch (err) {
            console.error("Error adding customer:", err);
            if (err.status == 400) {
                alert(err.response.data.message);
            }
        }
    };

    return (
        <>
            <form className="grid gap-5">
                {/* Customer Name */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Customer Name *
                    </label>
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Enter full name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Card Number */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Card Number *
                    </label>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Enter card number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Box Number */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Box Number *
                    </label>
                    <input
                        type="text"
                        name="boxNumber"
                        placeholder="Enter box number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.boxNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* Street */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Street
                    </label>
                    <input
                        type="text"
                        name="street"
                        placeholder="Enter street name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.street}
                        onChange={handleChange}
                    />
                </div>

                {/* Company */}
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                        Company *
                    </label>
                    <select
                        name="company"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Company</option>
                        <option value="SCV">SCV</option>
                        <option value="U-Digital">U-Digital</option>
                        <option value="GTPL">GTPL</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={submitSaveCustomer}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
                    >
                        Add Customer
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );

}

export default AddCustomerPopup;
