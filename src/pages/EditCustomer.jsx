import React, {useState} from "react";
import {Pencil, X} from "lucide-react";
import axios from "axios";

function EditCustomer() {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]); // <-- ARRAY NOW
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;


    const handleSearch = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/users/Searchcustomer`, {
                params: {searchValue}   // <-- FIXED
            });

            if (response.status === 200) {
                setResults([response.data]); // array for table
            }
        } catch (err) {
            console.error("Error fetching customer:", err);

            if (err.response?.status === 404) {
                alert(err.response.data.message);
                setResults([]); // Clear previous results
            }
        }
    };


    const handleEditClick = (customer) => {
        setEditData(customer);
        setOpenModal(true);
    };

    const handleInputChange = (e) => {
        setEditData({...editData, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        console.log("Updated data:", editData);

        // axios.put(`/api/customer/${editData.cardNumber}`, editData)
        try {
            const response = await axios.post(`${apiUrl}/api/users/EditCustomer`, editData);
            if (response.status == 200) {
                alert(`${response.data.message}`)
                setOpenModal(false);

            }
        }
        catch (err) {
            if (err.status == 400) {
                alert(`${err.response.data.message}`)

            }
        }

        // Update list after saving
        setResults((prev) =>
            prev.map((c) =>
                c.cardNumber === editData.cardNumber ? editData : c
            )
        );

    };


    // Save only box number
    const handleSaveBoxNumber = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/users/EditCustomerBox`, {
                cardNumber: editData.cardNumber,
                boxNumber: editData.boxNumber
            });
            if (response.status === 200) {
                alert(response.data.message);
                setOpenModal(false);
                setResults(prev =>
                    prev.map(c =>
                        c.cardNumber === editData.cardNumber
                            ? {...c, boxNumber: editData.boxNumber}
                            : c
                    )
                );
            }
        } catch (err) {
            alert(err.response?.data?.message || "Error updating box number");
        }
    };

    // Save all other details except box number
    const handleSaveDetails = async () => {
        try {
            const {boxNumber, ...otherDetails} = editData;
            const response = await axios.post(`${apiUrl}/api/users/EditCustomerDetails`, otherDetails);
            if (response.status === 200) {
                alert(response.data.message);
                setOpenModal(false);
                setResults(prev =>
                    prev.map(c =>
                        c.cardNumber === editData.cardNumber ? {...c, ...otherDetails} : c
                    )
                );
            }
        } catch (err) {
            alert(err.response?.data?.message || "Error updating details");
        }
    };


    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit Customer
            </h1>

            {/* Search Section */}
            <div className="mb-6 bg-white p-5 shadow-md rounded-xl border border-gray-200">
                <label className="block text-gray-700 font-medium mb-2">
                    Card Number
                </label>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter card number..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-blue-500"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Results Table / Responsive List */}
            {results.length > 0 && (
                <div className="bg-white shadow-md rounded-xl border border-gray-200">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full text-left table-auto">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3">Card No</th>
                                <th className="p-3">Box No</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Phone Number</th>
                                <th className="p-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {results.map((customer, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{customer.cardNumber}</td>
                                    <td className="p-3">{customer.boxNumber}</td>
                                    <td className="p-3">{customer.customerName}</td>
                                    {/* <td className="p-3">{customer.customerName}</td>     */}
                                    <td className="p-3">{customer.phoneNumber}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleEditClick(customer)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Mobile Cards */}
                    <div className="md:hidden flex flex-col gap-4 p-2">
                        {results.map((customer, index) => (
                            <div key={index} className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-1 shadow-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Card No:</span>
                                    <span>{customer.cardNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Box No:</span>
                                    <span>{customer.boxNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Customer Name:</span>
                                    <span>{customer.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Phone Number:</span>
                                    <span>{customer.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Company:</span>
                                    <span>{customer.company}</span>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => handleEditClick(customer)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={18} />Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Edit Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto animate-scaleIn max-h-[85vh] overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Edit Customer</h2>
                            <button onClick={() => setOpenModal(false)}>
                                <X className="text-gray-600" />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            className="grid gap-4 overflow-y-auto pr-2 h-[70vh]"
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     handleSave();
                        // }}
                        >
                            {/* 2-column fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                                    <input
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={editData.cardNumber}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg w-full bg-gray-100"
                                        type="text"
                                        readOnly={true}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Box Number</label>
                                    <input
                                        id="boxNumber"
                                        name="boxNumber"
                                        value={editData.boxNumber}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg w-full"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Customer Name</label>
                                    <input
                                        id="customerName"
                                        name="customerName"
                                        value={editData.customerName}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg w-full"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={editData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg w-full"
                                        type="tel"
                                    />
                                </div>
                            </div>

                            {/* Full Width Fields */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Street</label>
                                <input
                                    id="street"
                                    name="street"
                                    value={editData.street}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-lg w-full"
                                    type="text"
                                />
                            </div>

                            {/* Company Dropdown */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Company</label>
                                <select
                                    id="company"
                                    name="company"
                                    value={editData.company}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-lg w-full bg-white"
                                >
                                    <option value="">Select Company</option>
                                    <option value="JMC Cable">JMC Cable</option>
                                    <option value="Star Cable">Star Cable</option>
                                    <option value="Sun Cable">Sun Cable</option>
                                </select>
                            </div>

                            {/* Active / Inactive Checkbox */}
                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="checkbox"
                                    id="status"
                                    name="status"
                                    checked={editData.status === "Active"}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            status: e.target.checked ? "Active" : "Inactive",
                                        })
                                    }
                                    className="w-5 h-5 accent-blue-600"
                                />
                                <label htmlFor="status" className="text-gray-700 font-medium">
                                    Active
                                </label>
                            </div>


                            {/* Buttons */}
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 mt-4">

                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="px-3 py-1.5 text-sm bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSaveBoxNumber}
                                    className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                >
                                    Save Box
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSaveDetails}
                                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save Details
                                </button>

                            </div>


                        </form>
                    </div>
                </div>
            )}


        </div>
    );
}

export default EditCustomer;
