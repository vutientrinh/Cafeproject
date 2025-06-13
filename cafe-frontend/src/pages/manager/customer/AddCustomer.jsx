import ech from '../../../assets/images/ech.jpg';
import { useState, useEffect, useRef } from 'react';
import StaffService from '../../../services/staff.service'

import { useParams } from 'react-router-dom';
import useFetchObject from '../../../hooks/useFetchObject';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CustomerService from '../../../services/customer.service';


const AddCustomer = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dateOfBirthRef = useRef();
    const phoneNumberRef = useRef();
    const genderRef = useRef();

    const navigate = useNavigate();

    const handleAddClick = () => {
        const customer = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            dateOfBirth: dateOfBirthRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            gender: genderRef.current.value,
        };
        console.log(customer)
        CustomerService.addCustomer(customer)
            .then(data => {
                console.log('Customer added:', data);
                toast.success('Customer added successfully!');
                window.location.href = 'customers';
            })
            .catch(error => {
                console.error('Failed to add Customer:', error);
                toast.error(error.response.data.message);
            });
    };


    return (
        <div className="">
            <div className="mx-5 my-2 bg-custom rounded h-100">
                <div className="row mx-2 my-2">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='customers' class="handle h-100">
                            <div class="material-symbols-outlined fs-2" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="col col-12">
                        <div className="row">
                        </div>
                        <div className="container my-2 mb-4">
                            <form className="row">
                                <div className="col-md-6">
                                    <label htmlFor="inputFirstName" className="form-label text-uppercase fw-bold">First Name</label>
                                    <input type="text" className="form-control" id="inputFirstName" ref={firstNameRef} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputLastName" className="form-label text-uppercase fw-bold">Last Name</label>
                                    <input type="text" className="form-control" id="inputLastName" ref={lastNameRef} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputDateOfBirth" className="form-label text-uppercase fw-bold">Date of Birth</label>
                                    <input type="date" className="form-control" id="inputDateOfBirth" ref={dateOfBirthRef} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputGender" className="form-label text-uppercase fw-bold">Gender</label>
                                    <select id="inputGender" className="form-select" ref={genderRef}>
                                        <option value="MALE" selected>Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-2">
                                    <label htmlFor="inputPhoneNumber" className="form-label text-uppercase fw-bold">Phone Number</label>
                                    <input type="tel" className="form-control" id="inputPhoneNumber" ref={phoneNumberRef} />
                                </div>

                                <div className="mt-4 d-flex justify-content-around">
                                    <a className='w-15' href='customers'>
                                        <button type="button" className="btn btn-danger w-100">CANCEL</button>
                                    </a>
                                    <a className='w-15'>
                                        <button type="button" className="btn btn-success w-100" onClick={handleAddClick}>ADD</button>
                                    </a>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
            <ToastContainer />

        </div>
    );
}

export default AddCustomer;