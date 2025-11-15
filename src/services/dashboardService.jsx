import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


export async function getDashboardStats() {
    try {
        // Call the dashboard endpoint from the backend
        const url = `${apiUrl}/api/users/dashboard`;
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.error('Dashboard API error:', err);
        throw err;
    }
}

export default {getDashboardStats};
