import ech from '../../../assets/images/ech.jpg';
import { useState, useEffect, useRef } from 'react';
import StaffService from '../../../services/staff.service'

import { useParams } from 'react-router-dom';
import useFetchObject from '../../../hooks/useFetchObject';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const AddStaff = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const addressRef = useRef();
    const genderRef = useRef();

    const navigate = useNavigate();

    const handleAddClick = () => {
        const staff = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            address: addressRef.current.value,
            gender: genderRef.current.value,
        };

        StaffService.addStaff(staff)
            .then(data => {
                console.log('Staff added:', data);
                toast.success('Staff added successfully!');
                window.location.href = 'staffs';

            })
            .catch(error => {
                console.error('Failed to add staff:', error);
                toast.error(error.response.data.message);
                // window.location.href = 'staffs';
            });
    };


    return (
        <div className="container my-2 h-75">
            <div className="mx-2 bg-custom rounded h-100">

                <div className="row mx-2 my-2 h-100">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='staffs' class="handle h-100">
                            <div class="material-symbols-outlined fs-2" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="col col-12">
                        <div className="container my-2 mb-4">
                            <form className="row">
                                <div className="col-md-4">
                                    <label htmlFor="inputFirstName" className="form-label text-uppercase fw-bold">First Name</label>
                                    <input type="text" className="form-control" id="inputFirstName" ref={firstNameRef} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputLastName" className="form-label text-uppercase fw-bold">Last Name</label>
                                    <input type="text" className="form-control" id="inputLastName" ref={lastNameRef} />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="inputGender" className="form-label text-uppercase fw-bold">Gender</label>
                                    <select id="inputGender" className="form-select" ref={genderRef}>
                                        <option value="MALE" selected>Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputUsername" className="form-label text-uppercase fw-bold">Username</label>
                                    <input type="text" className="form-control" id="inputUsername" ref={usernameRef} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputPassword" className="form-label text-uppercase fw-bold">Password</label>
                                    <input type="password" className="form-control" id="inputPassword" ref={passwordRef} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputEmail" className="form-label text-uppercase fw-bold">Email</label>
                                    <input type="email" className="form-control" id="inputEmail" ref={emailRef} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="inputPhoneNumber" className="form-label text-uppercase fw-bold">Phone Number</label>
                                    <input type="tel" className="form-control" id="inputPhoneNumber" ref={phoneNumberRef} />
                                </div>
                                <div className="col-12 mt-2">
                                    <label htmlFor="inputAddress" className="form-label text-uppercase fw-bold">Address</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" ref={addressRef} />
                                </div>


                                <div className="mt-4 d-flex justify-content-around">
                                    <a className='w-15' href='staffs'>
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
    )
}

export default AddStaff;