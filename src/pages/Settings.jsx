import React, {useEffect, useState} from "react";
import axios from "axios";
import {X, Upload, Trash2, Calendar, FileDown, Newspaper, SwatchBook} from "lucide-react";
import * as XLSX from "xlsx";
import AddCustomerPopup from "../components/AddCustomer.jsx";

function Settings() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [openPopup, setOpenPopup] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [yearmonths, setYearmonths] = useState();
    const [currentMonth, setCurrentMonth] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState("")

    const closePopup = () => setOpenPopup(null);

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/users/getMonths`);
                setYearmonths(response.data.months);
                // ✅ Set currentMonth and selectedMonth to the active month
                const current = response.data.currentMonth?.month || "";
                setCurrentMonth(current);
                setSelectedMonth(current);
            } catch (e) {
                console.log("Error", e);
            }
        };

        fetchMonths();
    }, []);

    // console.log(apiUrl)



    const Popup = ({title, children}) => (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-all">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-fadeIn">
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>
                <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">
                    {title}
                </h3>
                {children}
            </div>
        </div>
    );

    /// ---------------------------------------------
    const handleSaveMonth = async () => {
        if (!selectedMonth) return alert("Please select a month first!");
        alert(`Month saved: ${selectedMonth}`);
        try {
            const response = await axios.post(`${apiUrl}/api/users/changeMonth`, {selectedMonth});
        }
        catch (e) {
            console.log("Error", e)
        }
        setSelectedMonth("");
        closePopup();
    };

    const handleDownload = async () => {
        if (!selectedMonth) return alert("Please select a month to download the report.");
        try {
            const response = await axios.get(`${apiUrl}/api/users/monthlyReport`, {
                params: {month: selectedMonth},  // pass month as an object
                responseType: 'blob'               // important to receive binary file
            });

            if (response.status === 200) {
                // Create a Blob from the response data
                const url = window.URL.createObjectURL(new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }));
                // Create a link element, set its href and download attribute
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Monthly_Report_${selectedMonth}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);  // Clean up memory
            }
        } catch (err) {
            console.error("Error downloading the report", err);
        }
        closePopup();
    };


    const handleDelete = async () => {
        if (!selectedMonth) return alert("Please select a month before deleting data.");
        console.log(selectedMonth)
        try {
            const response = await axios.post(`${apiUrl}/api/users/deleteData`, {selectedMonth})
            if (response.status == 200) {
                alert(`Data for ${selectedMonth} deleted successfully.`);

            }
        }
        catch (e) {
            console.log("error While delete Data", e)
        }
        closePopup();
    };

    // --------------------------------------------- Upload File -----------------------------
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an Excel file first!");
            return;
        }

        try {
            // ✅ Read Excel file as binary
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: "array"});

                // ✅ Get the first sheet
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                console.log("Excel Data:", jsonData);

                // ✅ Send data to backend
                const response = await axios.post(`${apiUrl}/api/users/uploadCustomers`, {data: jsonData});

                // alert("File uploaded successfully!");
                if (response.status === 200) {
                    alert("File uploaded successfully!");
                }
                closePopup();
                setSelectedFile(null);
            };
            reader.readAsArrayBuffer(selectedFile);
        } catch (error) {
            if (error.status === 400) {
                alert(`${error.response.data.message}`);
                return;
            }
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        }
    };



    // Day report Download 

    // Day report Excel download function (frontend)

    const dayReportDownload = async () => {
        try {
            console.log(selectedDate);

            // Axios GET request for Excel file response as blob
            const response = await axios.get(`${apiUrl}/api/users/day-excel?date=${selectedDate}`, {
                responseType: 'blob',  // Important for binary data (Excel)
                headers: {
                    Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            });

            // No response.ok in axios; check status instead
            if (response.status !== 200) throw new Error("Failed to download report");

            // response.data is the blob in axios with responseType 'blob'
            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `DayReport-${selectedDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            alert("Error downloading report: " + err.message);
        }
    };

    //  ---------------------------------------------   -----------------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
                    System Settings ⚙️
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Change Month",
                            color: "bg-blue-600 hover:bg-blue-700",
                            icon: <Calendar className="mr-2" size={18} />,
                            action: "changeMonth",
                        },
                        {
                            title: "Upload File",
                            color: "bg-green-600 hover:bg-green-700",
                            icon: <Upload className="mr-2" size={18} />,
                            action: "uploadFile",
                        },
                        {
                            title: "Monthly Report",
                            color: "bg-purple-600 hover:bg-purple-700",
                            icon: <FileDown className="mr-2" size={18} />,
                            action: "monthlyReport",
                        },
                        {
                            title: "DayWise Report",
                            color: "bg-purple-600 hover:bg-purple-700",
                            icon: <FileDown className="mr-2" size={18} />,
                            action: "dayReport",
                        },
                        {
                            title: "Add Customer",
                            color: "bg-pink-600 hover:bg-red-700",
                            icon: <SwatchBook className="mr-2" size={18} />,
                            action: "Add Customer",
                        },
                        {
                            title: "Delete Data",
                            color: "bg-red-600 hover:bg-red-700",
                            icon: <Trash2 className="mr-2" size={18} />,
                            action: "deleteData",
                        },

                    ].map((btn) => (
                        <button
                            key={btn.title}
                            onClick={() => setOpenPopup(btn.action)}
                            className={`${btn.color} text-white flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium shadow-md transition transform hover:-translate-y-1`}
                        >
                            {btn.icon}
                            {btn.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Change Month Popup */}
            {openPopup === "changeMonth" && (
                <Popup title="Select Month">
                    <select
                        className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">-- Select Month --</option>
                        {yearmonths &&
                            yearmonths.map((m) => (
                                <option key={m._id} value={m.month}>
                                    {m.month === currentMonth ? `${m.month} (Current)` : m.month}
                                </option>
                            ))}
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleSaveMonth}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </Popup>
            )}

            {/* Upload File Popup */}
            {openPopup === "uploadFile" && (
                <Popup title="Upload File">
                    <input
                        type="file"
                        accept=".xls, .xlsx, .csv"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="w-full p-3 border rounded-lg mb-5 bg-gray-50"
                    />

                    <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </Popup>
            )}

            {/* Download Report Popup */}
            {openPopup === "monthlyReport" && (
                <Popup title="Download Report">
                    <select
                        className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-purple-500 outline-none"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">-- Select Month --</option>
                        {yearmonths.map((m) => (
                            <option key={m._id} value={m.month}>
                                {m.month === currentMonth ? `${m.month} (Current)` : m.month}
                            </option>
                        ))}
                    </select>
                    <p className="mb-5 text-gray-700 dark:text-gray-300">
                        Click below to download your monthly report.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            Download
                        </button>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </Popup>
            )}

            {/* Download Day wise  */}
            {openPopup === "dayReport" && (
                <Popup title="Day Report">
                    <input type="date"
                        name="day"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-purple-500 outline-none"

                    />
                    <p className="mb-5 text-gray-700 dark:text-gray-300">
                        Click below to download your monthly report.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={dayReportDownload}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            Download
                        </button>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </Popup>
            )}

            {/* Delete Data Popup */}
            {openPopup === "deleteData" && (
                <Popup title="Delete Data Confirmation">
                    <select
                        className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-red-500 outline-none"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">-- Select Month --</option>
                        {yearmonths.map((m) => (
                            <option key={m.motn}>{m.month}</option>
                        ))}
                    </select>
                    <p className="mb-5 text-red-600 font-medium">
                        ⚠️ This action cannot be undone. Are you sure you want to delete data
                        for this month?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </Popup>
            )}

            {openPopup === "Add Customer" && (
                <Popup title="Add New Customer">
                    <AddCustomerPopup onClose={closePopup} />
                </Popup>
            )
            }




        </div>
    );
}

export default Settings;
