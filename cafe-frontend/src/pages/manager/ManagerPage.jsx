// React related imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// Testing library
import { render } from '@testing-library/react';

// React-pro-sidebar components
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';

// Order related imports
import Order from './order/Order';
import Menuitem from './order/MenuItem';
import Cart from './order/Cart';

// Staff related imports
import EmployeePage from './staff/EmployeePage';
import EmployeeDetail from './staff/EmployeeDetail';
import AddStaff from './staff/AddStaff';

// Product related imports
import ProductDetail from './product/ProductDetail';
import Receipt from './receipt/Receipt';
import ProductList from './product/ProductList';
import AddProduct from './product/AddProduct';

// Condiment related imports
import CondimentDetail from './condiment/CondimentDetail';
import CondimentList from './condiment/CondimentList';
import AddCondiment from './condiment/AddCondiment';

// Customer related imports
import Customer from './customer/CustomerPage';
import CustomerDetail from './customer/CustomderDetail';
import AddCustomer from './customer/AddCustomer';

// Assets
import avata from '../../assets/images/user.png';
import bg from '../../assets/images/bg.jpg';
import Home from './Home';
import DashBoard from './DashBoard';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authService from '../../services/auth.service';
import PageNotFound from '../../components/404page/404'
import UnauthPage from '../../components/404page/UnauthPage';

const ManagerPage = () => {
    const navigate = useNavigate();
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.result.token) {
            console.log("No user or token found in local storage.");
            return;
        }

        authService.introspect(user.result.token).then((data) => {
            if (!data.result.valid) {
                console.log("Token is not valid.");
                return;
            }

            const decodedToken = jwtDecode(user.result.token);
            const userRole = decodedToken.scope;

            if (userRole !== 'MANAGER') {
                console.log("User is not a manager.");
                return;
            }

            setIsManager(true);
        });
    }, []);


    if (!isManager) {
        return <UnauthPage />;
    }

    return (
        <div className="ManagerPage">
            <div className="d-flex">
                <NavBar></NavBar>
                <div className="main_display" style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover', // This will make the image cover the full screen
                    backgroundPosition: 'center', // This centers the image in the container
                    backgroundRepeat: 'no-repeat', // This will prevent the image from repeating
                    height: '100vh' // This makes the div take the full height of the viewport
                }}>
                    <div className="display">
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="dashboard" element={<DashBoard />} />


                            <Route path="staffs" element={<EmployeePage />} />
                            <Route path="staffs/:id" element={<EmployeeDetail />} />
                            <Route path="add-staff" element={<AddStaff />} />

                            <Route path="customers" element={<Customer />} />
                            <Route path="customers/:id" element={<CustomerDetail />} />
                            <Route path="add-customer" element={<AddCustomer />} />


                            <Route path="products" element={<ProductList />} />
                            <Route path="products/:id" element={<ProductDetail />} />
                            <Route path="add-product" element={<AddProduct />} />

                            <Route path="condiments" element={<CondimentList />} />
                            <Route path="condiments/:id" element={<CondimentDetail />} />
                            <Route path="add-condiment" element={<AddCondiment />} />

                            <Route path="receipt" element={<Receipt />} />

                            <Route path="cart" element={<Cart />} />
                            <Route path="order" element={<Order />} />

                        </Routes >
                    </div >
                </div >
            </div >
        </div >
    );
}

export default ManagerPage;
