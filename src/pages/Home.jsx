import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const customerData = {
  total: 1000,
  paid: 600,
  unpaid: 250,
  inactive: 150,
};

const barData = [
  {name: 'Paid', count: customerData.paid, total: customerData.total},
  {name: 'Unpaid', count: customerData.unpaid, total: customerData.total},
  {name: 'Inactive', count: customerData.inactive, total: customerData.total},
];

const pieData = [
  {name: 'Paid', value: customerData.paid},
  {name: 'Unpaid', value: customerData.unpaid},
  {name: 'Inactive', value: customerData.inactive},
];

const COLORS = ['#4f46e5', '#f59e0b', '#9ca3af']; // blue, yellow, gray colors

function Home() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow mb-8">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl" />
        <span className="text-blue-600 font-semibold text-lg">Hello Abdul Rasak</span>
      </div>

      {/* Responsive Charts Container */}
      <div className="lg:flex lg:justify-between gap-10">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg w-full lg:w-1/2" style={{minHeight: 300}}>
          <h2 className="text-xl font-semibold mb-5 text-gray-700 text-center">Customer Status Bar Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4f46e5" name="Count" />
              <Bar dataKey="total" fill="#e0e7ff" name="Total" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center mt-3 text-gray-600 text-sm italic">
            Bars represent number of customers paid, unpaid, and inactive out of total customers.
          </p>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg w-full lg:w-1/2" style={{minHeight: 300}}>
          <h2 className="text-xl font-semibold mb-5 text-gray-700 text-center">Customer Percentage Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center mt-3 text-gray-600 text-sm italic">
            Pie chart shows percentage distribution of paid, unpaid, and inactive customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
