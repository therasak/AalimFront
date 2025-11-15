import React, {useState, useEffect} from 'react';
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
import {getDashboardStats} from '../services/dashboardService';

const COLORS = ['#4f46e5', '#f59e0b', '#9ca3af']; // blue, yellow, gray colors

function Home() {
  const [userName, setUserName] = useState(localStorage.getItem("User"));
  const [customerData, setCustomerData] = useState({
    totalCustomers: 0,
    paidCount: 0,
    unpaidCount: 0,
    inactiveCustomersCount: 0,
    activeMonth: '',
    paymentPercentage: 0
  });
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDashboardStats();
        if (!mounted) return;

        setCustomerData(data);

        setBarData([
          {name: 'Paid', count: data.paidCount, total: data.totalCustomers},
          {name: 'Unpaid', count: data.unpaidCount, total: data.totalCustomers},
          {name: 'Inactive', count: data.inactiveCustomersCount, total: data.totalCustomers},
        ]);

        setPieData([
          {name: 'Paid', value: data.paidCount},
          {name: 'Unpaid', value: data.unpaidCount},
          {name: 'Inactive', value: data.inactiveCustomersCount},
        ]);

        setError(null);
      } catch (err) {
        if (!mounted) return;
        console.error('Dashboard error:', err);
        setError(err.response.data.message || 'Failed to load dashboard stats');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();
    return () => {mounted = false;};
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow mb-8">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl" />
        <span className="text-blue-600 font-semibold text-lg">Hello {userName}</span>
        {customerData.activeMonth && (
          <span className="ml-auto text-gray-600 text-sm">Active Month: <strong>{customerData.activeMonth}</strong></span>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600 text-lg">Loading dashboard data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {/* Stats Summary Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Customers</p>
            <p className="text-3xl font-bold text-blue-600">{customerData.totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Paid</p>
            <p className="text-3xl font-bold text-green-600">{customerData.paidCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Unpaid</p>
            <p className="text-3xl font-bold text-yellow-600">{customerData.unpaidCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Inactive</p>
            <p className="text-3xl font-bold text-gray-600">{customerData.inactiveCustomersCount}</p>
          </div>
        </div>
      )}

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
