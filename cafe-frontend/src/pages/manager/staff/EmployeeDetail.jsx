import ech from '../../../assets/images/ech.jpg';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import StaffService from '../../../services/staff.service'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState('process');

    // Create refs for each input field
    const nameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const phoneRef = useRef();
    const roleRef = useRef();
    const addressRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        StaffService.getStaffById(id)
            .then(data => {
                setStaff(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);

                setStatus('error');
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    }
    const handleRemove = () => {
        StaffService.deleteStaff(staff.id)
            .then(data => {
                navigate("/manager/staffs")
                // Handle successful removal here, e.g., navigate to another page
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleFinish = () => {
        // Create updatedStaff object with new values from input fields
        const updatedStaff = {
            ...staff,
            firstName: nameRef.current.value.split(' ')[0],
            lastName: nameRef.current.value.split(' ')[1],
            email: emailRef.current.value,
            gender: genderRef.current.value,
            phoneNumber: phoneRef.current.value,
            role: roleRef.current.value,
            address: addressRef.current.value,
            password: passwordRef.current.value
        };

        StaffService.updateStaff(updatedStaff, staff.id)
            .then(data => {
                setStaff(data);
                setEditMode(false);
                toast.success("updated staff successfully")
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    if (status === 'process') {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (status === 'error') {
        return <div>Error loading data</div>; // Or some error message
    }

    if (status === 'empty' || !staff) {
        return <div>No data found</div>; // Or some empty state
    }

    return (
        <div className="container my-2 h-75">
            <div className="mx-2 bg-custom rounded h-100">
                <div className="row mx-2 my-2">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='./' class="handle h-100">
                            <div class="material-symbols-outlined fs-2" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="col col-4 d-inline align-items-center justify-content-center mt-4">
                        <img src={ech} className="rounded mx-auto d-block w-75 h-75 img-thumbnail" />
                        <div className="mt-4 d-flex justify-content-around">
                            <button type="button" className="btn btn-danger" onClick={handleRemove}>Remove</button>
                            <button type="button" className="btn btn-info" onClick={handleEdit}>Edit</button>
                            {editMode && <button type="button" className="btn btn-success" onClick={handleFinish}>Finish</button>}
                        </div>
                    </div>
                    <div className="col col-8">
                        <div className="container my-2 mb-4">
                            <form className="row">
                                <div className="col-md-12">
                                    <label for="inputName" className="form-label">Full name</label>
                                    <input type="text" className="form-control" id="inputName" ref={nameRef} defaultValue={staff.firstName + ' ' + staff.lastName} disabled={!editMode} />
                                </div>
                                <div className="col-md-8 mt-2">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" ref={emailRef} defaultValue={staff.email} disabled={!editMode} />
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label for="inputState" className="form-label">Gender</label>
                                    <input type="email" className="form-control" id="inputEmail4" ref={genderRef} defaultValue={staff.gender} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label for="inputCity" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="inputCity" ref={phoneRef} defaultValue={staff.phoneNumber} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label for="inputZip" className="form-label">Role</label>
                                    <input type="text" className="form-control" id="inputRole" ref={roleRef} defaultValue={staff.role} disabled={!editMode} />
                                </div>
                                <div className="col-12 mt-2">
                                    <label for="inputAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="inputAddress" ref={addressRef} defaultValue={staff.address} disabled={!editMode} />
                                </div>
                                {editMode && (
                                    <div className="col-12 mt-2">
                                        <label for="inputPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword" ref={passwordRef} />
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
}

export default EmployeeDetail;

