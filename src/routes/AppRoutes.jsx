import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import MainLayout from '../layouts/mainLayout';
import Home from '../pages/Home';
import SideBar from '../components/SideBar';
import CustomerList from '../pages/CustomerList';
import Settings from '../pages/Settings';
import EditCustomer from '../pages/EditCustomer';
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<MainLayout />}>
        <Route path='home' element={<Home />} />
        <Route path='sidebar' element={<SideBar />} />
        <Route path='customerList' element={<CustomerList />} />
        <Route path='settings' element={<Settings />} />
        <Route path='editCustomer' element={<EditCustomer />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
