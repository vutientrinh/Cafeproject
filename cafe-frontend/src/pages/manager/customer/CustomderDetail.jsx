import ech from '../../../assets/images/ech.jpg';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StaffService from '../../../services/staff.service'
import customerService from '../../../services/customer.service';


const CustomerDetail = () => {

    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [status, setStatus] = useState('process');

    useEffect(() => {
        customerService.getCustomerById(id)
            .then(data => {
                setCustomer(data);
                console.log(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, [id]);

    if (status === 'process') {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (status === 'error') {
        return <div>Error loading data</div>; // Or some error message
    }

    if (status === 'empty' || !customer) {
        return <div>No data found</div>; // Or some empty state
    }
    return (
        <div className="Employee_detail h-100 w-100">
            <div className="mx-5 rounded bg-custom w-50 h-auto">
                <div className="row mx-2 my-5 py-4">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='./' class="handle h-100">
                            <div class="material-symbols-outlined fs-2" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="col col-12 mt-3">

                        <div className="container my-2 mb-4">
                            <form className="row">
                                <div className="col-md-8">
                                    <label for="inputName" className="form-label fw-bold">Full name</label>
                                    <input type="text" className="form-control" id="inputName" value={customer.firstName + ' ' + customer.lastName} />
                                </div>
                                <div className="col-4">
                                    <label for="inputAddress" className="form-label fw-bold">Birthday</label>
                                    <input type="" className="form-control" id="inputBirthday" defaultValue={new Date(customer.dateOfBirth).toLocaleDateString()}/>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <label for="inputState" className="form-label fw-bold">Gentle</label>
                                    <select id="inputState" className="form-select">
                                        <option selected>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="col-3 mt-2">
                                    <label for="inputAddress" className="form-label fw-bold">Rank</label>
                                    <input type="text" className="form-control" id="inputAddress" defaultValue={customer.rankName} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label for="inputCity" className="form-label fw-bold">Phone Number</label>
                                    <input type="tel" className="form-control" id="inputCity" defaultValue={customer.phoneNumber} />
                                </div>


                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CustomerDetail;