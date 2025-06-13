import axios from "axios";
import authHeader from "./authHeader";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/condiment";
class CondimentService {

    getAll() {
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

    getById(id) {
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
    addCondiment(condiment) {
        return axios.post(`${API_URL}`, condiment, { headers: authHeader() })
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
    updateCondiment(id, condiment) {
        return axios.put(`${API_URL}/${id}`, condiment, { headers: authHeader() })
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
    deleteCondiment(id) {
        return axios.delete(`${API_URL}/${id}`, {}, { headers: authHeader() })
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

export default new CondimentService();