import axios from "axios";
import authHeader from "./authHeader";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/manager/staffs";
class StaffService {

    getListStaff() {
        return axios.get(`${API_URL}`, { headers: authHeader() })
            .then(response => {
                if (response.data.result) {
                    return response.data.result;
                } else {
                    throw new Error('No data found');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }

    getStaffById(id) {
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() })
            .then(response => {
                if (response.data.result) {
                    return response.data.result;
                } else {
                    throw new Error('No data found');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }
    addStaff(staff) {
        return axios.post(`${API_URL}`, staff, { headers: authHeader() })
            .then(response => {
                if (response.data.code === 0) {
                    return response.data.result;
                } else {
                    throw new Error('Failed to add staff');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }

    updateStaff(staff, id) {
        return axios.put(`${API_URL}/${id}`, staff, { headers: authHeader() })
            .then(response => {
                if (response.data.code === 0) {
                    return response.data.result;
                } else {
                    throw new Error('Failed to add staff');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }
    deleteStaff(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() })
            .then(response => {
                if (response.data.code === 0) {
                    return response.data.result;
                } else {
                    throw new Error('Failed to add staff');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }
}

export default new StaffService();