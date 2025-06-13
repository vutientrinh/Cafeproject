import axios from "axios";
import authHeader from "./authHeader";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/product";
class ProductService {

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
    addProduct(product) {
        return axios.post(`${API_URL}`, product, { headers: authHeader() })
            .then(response => {
                if (response.data.result) {
                    return response.data.result;
                } else {
                    throw new Error('Failed to add Product');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }
    uploadImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        return axios.post(`${API_URL}/upload-image`, formData, { headers: authHeader() })
            .then(response => {
                if (response.data.code == 0) {
                    return response.data.result;
                } else {
                    throw new Error('Failed to upload image');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                throw error;
            });
    }

    updateProduct(id, product) {
        return axios.put(`${API_URL}/${id}`, product, { headers: authHeader() })
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
}

export default new ProductService();