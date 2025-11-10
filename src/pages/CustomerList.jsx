import React, {useState} from "react";
import {X} from "lucide-react";

const customers = [
  {id: 1, cardNumber: "12345", boxNumber: "A1", name: "John Doe", company: "Company A", phone: "9876543210"},
  {id: 2, cardNumber: "67890", boxNumber: "B2", name: "Jane Smith", company: "Company B", phone: "8765432109"},
  {id: 3, cardNumber: "54321", boxNumber: "C3", name: "Michael Johnson", company: "Company C", phone: "7654321098"},
  
];

function CustomerList() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setAmount("");
  };

  const closeModal = () => setSelectedCustomer(null);

  const handlePaid = () => {
    alert(`Payment recorded for ${selectedCustomer.name} — Amount: ₹${amount}`);
    closeModal();
  };

  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.cardNumber.toLowerCase().includes(term) ||
      customer.boxNumber.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full overflow-x-hidden p-4">
      {/* Search box */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, card no, or box no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">S.No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Card Number</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Box Number</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  onClick={() => handleRowClick(customer)}
                  className={`cursor-pointer transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-blue-50`}
                >
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{customer.cardNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{customer.boxNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 font-medium">{customer.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 text-sm">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 md:w-1/3 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Customer Details
            </h2>

            {/* Info Section */}
            <div className="space-y-3 text-gray-700 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{selectedCustomer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Card No:</span>
                <span>{selectedCustomer.cardNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Box No:</span>
                <span>{selectedCustomer.boxNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Company:</span>
                <span>{selectedCustomer.company}</span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mt-5">
              <label className="block text-gray-700 font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handlePaid}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md"
            >
              💰 Mark as Paid
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerList;
