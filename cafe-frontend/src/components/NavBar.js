import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';


const NavBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [activeLink, setActiveLink] = useState('');

    // Function to toggle visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className={`navbar-inner nav_bar ${!isVisible ? 'nav_bar_change' : ''}`} style={{ overflowY: 'scroll' }}>
            <div id="transition" class="user-select-none d-flex justify-content-end mt-2">
                <div id="open" className={`door button-transition ${isVisible ? 'd-none' : ''}`} onClick={toggleVisibility}>
                    <span className="material-symbols-outlined fs-2">
                        double_arrow
                    </span>
                </div>
                <div id="close" className={`door button-transition ${isVisible ? '' : 'd-none'}`} onClick={toggleVisibility}>
                    <span className="material-symbols-outlined  fs-2">
                        keyboard_double_arrow_left
                    </span>
                </div>
            </div>
            <div className="center-layout h-auto">
                <div id="side-button">
                    <Link to="/manager/home" className="nav-link" >
                        <div className={`side-button text-custom ${activeLink === 'home' ? 'active' : ''}`} onClick={() => setActiveLink('home')} id="home" style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout" >
                                home
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Home</p>
                        </div>
                    </Link>
                    <Link to="/manager/dashboard" className="nav-link" >

                        <div className={`side-button text-custom ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveLink('dashboard')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout">
                                dashboard
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>DaskBoard</p>
                        </div>
                    </Link>



                    <Link to="/manager/receipt" className='nav-link'>
                        <div className={`side-button text-custom ${activeLink === 'receipt' ? 'active' : ''}`} onClick={() => setActiveLink('receipt')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div class="material-symbols-outlined center-layout text-custom">
                                receipt_long
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Receipt</p>
                        </div>
                    </Link>

                    <Link to="/manager/order" className="nav-link">
                        <div className={`side-button text-custom ${activeLink === 'order' ? 'active' : ''}`} onClick={() => setActiveLink('order')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout text-custom">
                                dvr
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Order</p>
                        </div>
                    </Link>

                    <Link to="/manager/products" className="nav-link">
                        <div className={`side-button text-custom ${activeLink === 'products' ? 'active' : ''}`} onClick={() => setActiveLink('products')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout">
                                category
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Product</p>
                        </div>
                    </Link>
                    <Link to="/manager/condiments" className="nav-link">
                        <div className={`side-button text-custom ${activeLink === 'condiments' ? 'active' : ''}`} onClick={() => setActiveLink('condiments')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout">
                                category
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Condiment</p>
                        </div>
                    </Link>
                    <Link to="/manager/staffs" className="nav-link">
                        <div className={`side-button text-custom ${activeLink === 'staffs' ? 'active' : ''}`} onClick={() => setActiveLink('staffs')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout">   
                                group
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Employee</p>
                        </div>
                    </Link>

                    <Link to="/manager/customers" className="nav-link">
                        <div className={`side-button text-custom ${activeLink === 'customers' ? 'active' : ''}`} onClick={() => setActiveLink('customers')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex' }}>
                            <div className="material-symbols-outlined center-layout text-custom">
                                account_circle
                            </div>
                            <p className="m-0 px-2 center-layout" style={{ display: isVisible ? '' : 'none' }}>Customer</p>
                        </div>
                    </Link>


                    <div className="nav-link mt-5">
                        <div className={`side-button text-custom door ${activeLink === 'signin' ? 'active' : ''}`} onClick={() => setActiveLink('signin')} style={{ justifyContent: isVisible ? '' : 'center', alignItems: isVisible ? '' : 'center', display: isVisible ? '' : 'flex', width: "30%", marginRight: "10px", marginLeft: "auto" }}>
                            <Link to="/signin" className="material-symbols-outlined center-layout text-custom handle">
                                logout
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>




    );
}
export default NavBar;