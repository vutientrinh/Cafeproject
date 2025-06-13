import shopping from '../assets/images/shopping-cart.png'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/images/add.png'
import Order from '../pages/manager/order/Order';



const SearchBar = ({ receipt, newOrder,onSearch }) => {
    const [inputValue, setInputValue] = useState(null);

    const handleInputChange = async (event) => {
        await setInputValue(event.target.value);
        await onSearch(event.target.value);
    };

    return (
        <div id="search" className="d-flex flex-direction-row py-1 navbar navbar-expand-lg navbar-light bg-body-tertiary" style={{ userSelect: 'none' }}>
            <div id="search_bar" className='w-25' style={{ marginLeft: "37%", marginRight: 'auto' }}>
                <div class="d-flex h-25" role="search">
                    <input class="form-control me-2 rounded border border-1 border-dark "
                        type="search"
                        placeholder="Search"
                        value={inputValue}
                        onChange={(handleInputChange)}
                    />
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

    );
}

export default SearchBar;