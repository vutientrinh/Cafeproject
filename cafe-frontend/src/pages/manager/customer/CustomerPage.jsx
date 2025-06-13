import { useState, useEffect } from 'react';
import right from '../../../assets/images/right.png';
import customerService from '../../../services/customer.service';
import { Link } from 'react-router-dom';
import add from '../../../assets/images/add.png'
import { _getStartAndCountOfVisiblePoints } from 'chart.js/helpers';




const Customer = () => {

    const [customer, setCustomer] = useState(null);
    const [status, setStatus] = useState('process');
    const [inputValue, setInputValue] = useState((null));
    const [rankFilter, setRankFilter] = useState('ALL');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    useEffect(() => {
        customerService.getListCustomer()
            .then(data => {
                setCustomer(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, []);



    return (
        <div className="Customer">
            <div className="container my-3">
                <div className="mx-1 my-1 bg-custom p-2 rounded">
                    <div className="d-flex container align-items-end" id="filter-bar">
                        <div class="d-flex h-25 " role="search">
                            <input class="form-control me-2"
                                type="search"
                                placeholder="Search" aria-label="Search" value={inputValue}
                                onChange={(e) => (setInputValue(e.target.value), console.log(inputValue))
                                } />
                        </div>
                        <div className="mx-5 w-15">
                            <label class="form-label mb-0" style={{ color: "black", zIndex: "1", marginLeft: "10px" }}>Rank</label>
                            <select className="form-select form-select-lg" style={{ marginTop: '-10px', backgroundColor: '#e2c8a5' }}
                                value={rankFilter}
                                onChange={(e) => setRankFilter(e.target.value)}>
                                <option value="ALL">ALL</option>
                                <option value="Unrank">Unrank</option>
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Emerald">Emerald</option>
                                <option value="Diamond">Diamond</option>
                            </select>
                        </div>
                        <div className="w-15" style={{ marginRight: '0px', marginLeft: 'auto' }}>
                            <a href="add-customer" className="btn btn-success w-100">
                                <img src={add} alt="add" className="button-transition" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-3 container">

                        {status === 'process' && <h1>Loading...</h1>}
                        {status === 'finish' && (

                            <table className="table table-striped  table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Rank</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer
                                        .filter(customer => {
                                            if ((inputValue === null || customer.phoneNumber.includes(inputValue)) &&
                                                (rankFilter === "ALL" || rankFilter === customer.rankName)) {
                                                return customer;
                                            } else {
                                                return null; // or any other value
                                            }

                                        })
                                        .map((customer, index) => (

                                            <tr key={index}>
                                                <th scope="row">{customer.id}</th>
                                                <td>{customer.firstName}</td>
                                                <td>{customer.lastName}</td>
                                                <td>{customer.phoneNumber}</td>
                                                <td>{customer.rankName}</td>
                                                <td><Link to={`/manager/customers/${customer.id}`}><img src={right} alt="right"
                                                    className="button-transition" /></Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                        {status === 'error' && <h1>Đợi 1 xíu...</h1>}
                        {status === 'empty' && <h1>Empty...</h1>}

                    </div>

                </div>
            </div>
        </div >
    );
}

export default Customer;