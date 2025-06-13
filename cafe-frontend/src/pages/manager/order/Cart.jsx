import React, { useEffect, useState, } from 'react';
import coffee from '../../../assets/images/coffee-cup.png'
import orderService from '../../../services/order.service';
import customerService from '../../../services/customer.service'
import { useNavigate } from 'react-router-dom';
import DropDown from '../../../components/DropDown';
import SearchBox from '../../../components/DropDown';
import FoodItem from './FoodItem';


const Cart = () => {

    const navigate = useNavigate();
    const [receipt, setReceipt] = useState(null)
    const [customers, setCustomers] = useState(null)

    const [status, setStatus] = useState('process');

    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showGiftMenu, setShowGiftMenu] = useState(false);

    useEffect(() => {
        customerService.getListCustomer()
            .then(data => {
                setCustomers(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        if (inputValue === '') {
            setFilteredCustomers([]);
        } else {
            setFilteredCustomers(customers.filter(customer => customer.phoneNumber.includes(inputValue)).slice(0, 5));
        }
    }, [inputValue, customers]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCustomerClick = async (customerId) => {
        // Call updateCustomerReceipt with customerId and receipt.id
        await orderService.updateCustomerReceipt(customerId, receipt.id)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        // Find the customer with the given customerId
        const customer = customers.find(c => c.id === customerId);

        // Check if today is the customer's birthday
        const today = new Date();
        const customerDOB = new Date(customer.dateOfBirth);
        if (customerDOB.getDate() === today.getDate() &&
            customerDOB.getMonth() === today.getMonth()) {

            // If today is the customer's birthday, call checkGiftCustomer
            await orderService.checkGiftCustomer(customerId)
                .then(result => {
                    // If checkGiftCustomer returns true, setShowGiftMenu to true
                    if (result === true) {
                        setShowGiftMenu(true);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    };



    const updateCustomerReceipt = (customerId, receiptId) => {
        orderService.updateCustomerReceipt(customerId, receiptId)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const updateQuantity = (productDetailId, quantity) => {
        orderService.updateProductReceipt(productDetailId, quantity)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const deleteProduct = (id) => {
        orderService.deleteProductReceipt(id)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const completeOrder = (id) => {
        orderService.finishOrder(id)
            .then(data => {
                setReceipt(data);
                navigate('/manager/order') // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const updateCondimentQuantity = (id, quantity) => {
        orderService.updateCondimentQuantity(id, quantity)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const deleteCondiment = (id) => {
        orderService.deleteCondiment(id)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const deleteOrder = (id) => {
        orderService.deleteOrder(id)
            .then(data => {
                setReceipt(null); // update the receipt state to null after deleting the order
                navigate('/manager/order'); // navigate to the order management page
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const removeCustomer = (id) => {
        orderService.removeCustomerReceipt(id)
            .then(data => {
                setReceipt(data); // update the receipt state with the new receipt data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }



    useEffect(() => {
        orderService.getLastestProcessOrder()
            .then(data => {
                setReceipt(data);
                setStatus('finish');
                // set the receiptId with the data.id
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, []);
    useEffect(() => {
        customerService.getListCustomer()
            .then(data => {
                setCustomers(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    if (status === 'process') {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (status === 'error') {
        return <div>Error loading data</div>; // Or some error message
    }

    if (status === 'empty') {
        return <div>No data found</div>; // Or some empty state
    }
    return (
        <div id="cartDetail" className=" container mt-2 w-100  ">
            <div className={`Cart h-100 rounded ${showGiftMenu ? 'dim' : ''}`} role="dialog" style={{ backgroundColor: '#a47152' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h1 className="fw-bold mb-0 text-black">Cart Detail</h1>
                                                    </div>
                                                    <h6 className="mb-0 text-muted">{`${receipt.productDetails.length}`} items</h6>

                                                </div>

                                                {receipt.productDetails.map((product, index) => (
                                                    <>
                                                        <hr className="my-4"></hr>
                                                        <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={product.productSize.image ? product.productSize.image : coffee}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 className="text-black mb-0">{`${product.productSize.productName} (${product.productSize.sizeName})`}</h6>
                                                            </div>
                                                            <div className="col-md-2 col-lg-2 col-xl-2 d-flex flex-column">
                                                                <div>


                                                                    <input
                                                                        id="form1"
                                                                        min="1"
                                                                        name="quantity"
                                                                        value={product.productQuantity}
                                                                        type="number"
                                                                        className="form-control form-control-sm"
                                                                        onChange={(e) => updateQuantity(product.id, e.target.value)}
                                                                    />


                                                                </div>

                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-3 d-flex justify-content-between">
                                                                <h6 className="mb-0">{`$${product.productPrice}`}</h6>
                                                                <h6 className="mb-0">{`${product.productDiscount * 100}%`}</h6>
                                                                <h6 className="mb-0">{`$${(product.productQuantity * product.productPrice * (1 - product.productDiscount)).toFixed(2)}`}</h6>
                                                            </div>



                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <a className="float-end text-black handle" onClick={() => deleteProduct(product.id)}>

                                                                    <span className="material-symbols-outlined">
                                                                        close
                                                                    </span>

                                                                </a>
                                                            </div>
                                                        </div>
                                                        {product.productCondimentDetails.map((condimentDetail, index) => (
                                                            <div className="row my-2 d-flex" style={{ marginLeft: "4%" }}>
                                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                                    <img
                                                                        src={condimentDetail.condiment.image ? condimentDetail.condiment.image : coffee}
                                                                        className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 className="text-black mb-0">{`${condimentDetail.condiment.name}`}</h6>
                                                                </div>
                                                                <div className="col-md-4 col-lg-4 col-xl-2 d-flex flex-column">
                                                                    <div>
                                                                        <input
                                                                            id="form1"
                                                                            min="1"
                                                                            name="quantity"
                                                                            value={condimentDetail.quantity}
                                                                            type="number"
                                                                            className="form-control form-control-sm"
                                                                            onChange={(e) => updateCondimentQuantity(condimentDetail.id, e.target.value)}
                                                                        />
                                                                    </div>

                                                                </div>

                                                                <div className="col-md-3 col-lg-2 col-xl-2">
                                                                    <h6 className="mb-0">{`$${condimentDetail.condimentPrice}`}</h6>
                                                                </div>
                                                                <div className="col-md-3 col-lg-2 col-xl-2">
                                                                    <h6 className="mb-0">{`$${(condimentDetail.condimentPrice * condimentDetail.quantity).toFixed(2)}`}</h6>
                                                                </div>


                                                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                    <a className="float-end text-black" onClick={() => deleteCondiment(condimentDetail.id)}>
                                                                        <span className="material-symbols-outlined handle">
                                                                            close
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                ))}


                                                <hr className="my-4"></hr>

                                                <div className="pt-5">
                                                    <h6 className="mb-0"><a href="order" className="text-body"><i
                                                        className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <div className="d-flex flex-column justify-content-between mb-4">
                                                    <h5>Date :  {receipt ? `${receipt.date}` : ''}</h5>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between mb-4">
                                                    <h5> Staff name : {receipt ? ` ${receipt.staff.firstName + ' ' + receipt.staff.lastName}` : ''}</h5>
                                                </div>
                                                <hr className="my-4"></hr>
                                                <div className="mb-4 pb-2">
                                                    <label className="form-label" for="phonenumber">
                                                        Customer Name : {receipt.customer ? receipt.customer.lastName : 'None'}
                                                    </label>
                                                    {receipt.customer && (
                                                        <a className="float-end text-black handle" onClick={() => removeCustomer(receipt.id)}>
                                                            <span className="material-symbols-outlined">
                                                                close
                                                            </span>
                                                        </a>
                                                    )}
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        onFocus={() => setFilteredCustomers(customers.filter(customer => customer.phoneNumber.includes(inputValue)).slice(0, 5))}
                                                        onBlur={() => setTimeout(() => setFilteredCustomers([]), 200)}
                                                    />
                                                    {filteredCustomers.length > 0 && (
                                                        <div className='rounded p-3 mt-1' style={{ position: 'absolute', backgroundColor: 'white', zIndex: 1, width: "25%" }}>
                                                            {filteredCustomers.map((customer) => (
                                                                <div key={customer.id} onClick={() => handleCustomerClick(customer.id)}>
                                                                    {customer.firstName} {customer.lastName}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="d-flex flex-column justify-content-between mb-4">
                                                    <h5>{`Subtotal: $${receipt.totalPrice}`}</h5>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between mb-4">
                                                    <h5>{`Discount: ${receipt.discount * 100}%`}</h5>
                                                </div>
                                                <hr className="my-4"></hr>

                                                <div className="d-flex flex-column justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>{`$${receipt.totalPrice * (1 - receipt.discount)}`}</h5>
                                                </div>
                                                <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark btn-block w-75"
                                                        onClick={() => completeOrder(receipt.id)}
                                                    >
                                                        Finish Order
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark btn-block w-75 mt-3"
                                                        onClick={() => deleteOrder(receipt.id)}
                                                    >
                                                        Delete Order
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showGiftMenu && (
                    <div className="order-detail">
                        <FoodItem
                            receipt={receipt}
                            setReceipt={setReceipt}
                            closeMenu={() => setShowGiftMenu(false)}
                        />
                    </div>
                )
            }
        </div >
    )
}

export default Cart;