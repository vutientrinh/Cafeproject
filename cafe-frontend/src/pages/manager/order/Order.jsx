import coffeecup from '../../../assets/images/coffee-cup.png'
import productService from '../../../services/product.service';
import MenuItem from './MenuItem';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/SearchBar';
import orderService from '../../../services/order.service';
import add from '../../../assets/images/add.png'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import condimentService from '../../../services/condiment.service';
import CondimentItem from './CondimentItem';
import shopping from '../../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom';



const Order = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [receipt, setReceipt] = useState(null)
    const [products, setProducts] = useState(null);
    const [condiments, setCondiments] = useState(null);
    const [status, setStatus] = useState('process');
    const [selectedOption, setSelectedOption] = useState('Product');
    const [type, setType] = useState('ALL');
    const [activeType, setActiveType] = useState('ALL');
    const [inputValue, setInputValue] = useState('');




    const handleClick = async (product) => {
        if (receipt) {
            setSelectedProduct(product);
            setShowOrderDetail(true);
        } else {
            await newOrder();
            setSelectedProduct(product);
            setShowOrderDetail(true);
        }
    };

    const newOrder = () => {
        orderService.newOrder()
            .then(data => {
                setReceipt(data); // set the receiptId with the data.id
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(() => {
        productService.getAll()
            .then(data => {
                setProducts(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });

    }, []);
    useEffect(() => {
        orderService.getLastestProcessOrder()
            .then(data => {
                setReceipt(data); // set the receiptId with the data.id
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        condimentService.getAll()
            .then(data => {
                setCondiments(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    return (
        <div class="h-100">
            <div className='search_bar'>
                {/* <SearchBar
                    onSearch={handleOrder}
                    receipt={receipt}
                    newOrder={newOrder}>
                </SearchBar> */}
                <div id="search" className="d-flex flex-direction-row py-1 navbar navbar-expand-lg navbar-light bg-body-tertiary" style={{ userSelect: 'none' }}>
                    <div id="search_bar" className='w-25' style={{ marginLeft: "37%", marginRight: 'auto' }}>
                        <div class="d-flex h-25" role="search">
                            <input class="form-control me-2 rounded border border-1 border-dark "
                                type="search"
                                placeholder="Search" aria-label="Search" value={inputValue}
                                onChange={(e) => (setInputValue(e.target.value), console.log("check update" + inputValue))
                                } />
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', marginRight: '1%', userSelect: 'none' }}>
                        {receipt ? (
                            <button type="button" className="btn btn-outline-success d-flex justify-content-center align-items-center h-100 mr-0 ml-auto" style={{ userSelect: 'none', width: '15%' }}>
                                <Link to="/manager/cart">
                                    <img src={shopping} style={{ width: '50%' }} />
                                </Link>
                            </button>
                        ) : (

                            <button onClick={newOrder} type="button" className="btn btn-outline-success d-flex justify-content-center align-items-center h-100 mr-0 ml-auto" style={{ userSelect: 'none', width: '15%' }}>
                                <img src={shopping} style={{ width: '50%' }} />
                            </button>
                        )}
                    </div>
                </div>

            </div>
            <div className={`Order menu_container w-100 ${showOrderDetail ? 'dim' : ''}`}>
                <div id="drink-show" className="h-100 w-100 ">
                    <div id="drink-item" className="d-flex w-100">
                        <div id="item" className="w-100 rounded">
                            <div id="food-show" className="">
                                <div className="title merriweather-regular-italic " id="filter-bar">
                                    Our Menu
                                </div>
                                <div id="food-option" className="d-flex flex-row text-align-center my-4 mx-3">
                                    <select className="form-select-lg form-select w-15 " value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="Product">Product</option>
                                        <option value="Condiment">Condiment</option>
                                    </select>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'ALL'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('ALL'), setActiveType('ALL'))} >ALL</button>
                                    </div>
                                    <div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'CAFE'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('CAFE'), setActiveType('CAFE'))} >CAFE</button>
                                    </div>
                                    <div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'MILKTEA'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('MILKTEA'), setActiveType('MILKTEA'))} >MILKTEA</button>
                                    </div>
                                    <div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'SOFTDRINK'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('SOFTDRINK'), setActiveType('SOFTDRINK'))} >SOFTDRINK</button>
                                    </div>
                                    <div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'SMOOTHIE'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('SMOOTHIE'), setActiveType('SMOOTHIE'))} >SMOOTHIE</button>
                                    </div>
                                    <div id="orderbtn" className='w-15 m-2 d-flex justify-content-center align-items-center'>
                                        <button type="button" className={activeType === 'FOOD'
                                            ? "w-75 btn rounded order fw-bold fs-5 active" // Add active class when ALL
                                            : "w-75 btn rounded order fw-bold fs-5"} style={{ backgroundColor: "#f5d9b3" }} onClick={() => (setType('FOOD'), setActiveType('FOOD'))} >FOOD</button>
                                    </div>

                                </div>
                                <div id="list-food" className="grid-container">
                                    {status === 'process' && <h1>Loading...</h1>}
                                    {status === 'finish' && (
                                        <>
                                            {(selectedOption === 'Product' ? products : condiments)
                                                .filter(item => {
                                                    console.log("before compare:" + inputValue)
                                                    if (item.productStatus === "ABLE") {
                                                        if((inputValue ===null||item.name.includes(inputValue)) && (type === "ALL" || type === item.productType)) return item;

                                                    } else {
                                                        return null;
                                                    }
                                                }
                                                )
                                                .map((item, index) => (
                                                    <div class="item-drink">
                                                        <img src={item.image ? item.image : coffeecup}
                                                            class="w-75 h-75 image-item" alt="" />
                                                        <div class="w-100">
                                                            <div class="d-flex justify-content-center w-100 overflow-hidden">
                                                                <h5 class="mb-0">{item.name} </h5>
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn border border-2 border-dark rounded order" style={{ backgroundColor: "#f5d9b3" }} onClick={() => handleClick(item)}>Order</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </>
                                    )}
                                    {status === 'error' && <h1>Đợi 1 xíu...</h1>}
                                    {status === 'empty' && <h1>Empty...</h1>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {
                showOrderDetail && (
                    <div className="order-detail">
                        {selectedOption === 'Product' ? (
                            <MenuItem
                                selectedProduct={selectedProduct}
                                receipt={receipt}
                                closeMenu={() => setShowOrderDetail(false)}
                            />
                        ) : (
                            <CondimentItem
                                selectedProduct={selectedProduct}
                                receipt={receipt}
                                closeMenu={() => setShowOrderDetail(false)}
                            />
                        )}
                    </div>
                )
            }

            <ToastContainer />
        </div >
    );
}

export default Order;

