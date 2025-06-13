import right from '../../../assets/images/right.png'

import add from '../../../assets/images/add.png'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StaffService from '../../../services/staff.service'

const EmployeePage = () => {

    const [roleFilter, setRoleFilter] = useState('ALL');
    const [staff, setStaff] = useState(null);
    const [status, setStatus] = useState('process');

    useEffect(() => {
        StaffService.getListStaff()
            .then(data => {
                setStaff(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, []);
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
        <div className="Employee_page">
            <div className="container my-3">
                <div className="mx-1 my-1 bg-custom p-2 rounded">
                    <div className="d-flex container align-items-center" id="filter-bar">
                        <div className="w-15">
                            <label class="form-label mb-0" style={{ color: "black", zIndex: "1", marginLeft: "10px" }}>Role</label>
                            <select className="form-select form-select-lg" style={{ marginTop: '-10px', backgroundColor: '#e2c8a5' }}
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}>
                                <option value="ALL">ALL</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="STAFF">STAFF</option>
                            </select>
                        </div>
                        <div class="" style={{ marginRight: '0px', marginLeft: 'auto', width: '10%' }}>
                            <a class="btn btn-success w-100" href='add-staff'>
                                <img src={add} alt="add" className="button-transition" />
                            </a>
                        </div>

                    </div>
                    <div className="mt-3 container">
                        <table className="table table-striped  table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.slice(1)
                                    .filter(employee => {
                                        if(roleFilter==="ALL")return employee;
                                        else if(employee.role===roleFilter)return employee;
                                    })
                                    .filter(employee => (roleFilter === 'ALL' || employee.role === roleFilter) && employee.userName).map((employee, index) => (
                                        <tr key={index}>
                                            <th scope="row">{employee.id}</th>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.role}</td>
                                            <td>{employee.phoneNumber}</td>
                                            <td><Link to={`/manager/staffs/${employee.id}`}><img src={right} alt="right" className="button-transition" /></Link></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
    );

}

export default EmployeePage;