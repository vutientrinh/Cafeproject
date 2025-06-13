import axios from "axios";
import authHeader from "./authHeader";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/order";
class OrderService {

    newOrder() {
        return axios.post(`${API_URL}/new-order`, {}, { headers: authHeader() })
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
    updateCustomerReceipt(customerId, receiptId) {
        return axios.put(`${API_URL}/update-customer-receipt`, { customerId, receiptId }, { headers: authHeader() })
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
    getLastestProcessOrder() {
        return axios.get(`${API_URL}/process-receipt-id`, { headers: authHeader() })
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
    addProductReceipt(body) {

        return axios.post(`${API_URL}/add-product-receipt`, body, { headers: authHeader() })
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
    updateProductReceipt(productDetailId, quantity) {
        return axios.put(`${API_URL}/update-product-receipt`, { productDetailId, quantity }, { headers: authHeader() })
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
    deleteProductReceipt(id) {
        return axios.delete(`${API_URL}/delete-product-receipt/${id}`, { headers: authHeader() })
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
    finishOrder(id) {
        return axios.put(`${API_URL}/finish-order/${id}`, {}, { headers: authHeader() })
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
    addCondimentReceipt(productDetailId, condimentId, quantity) {
        return axios.post(`${API_URL}/add-condiment-receipt`, { productDetailId, condimentId, quantity }, { headers: authHeader() })
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
    updateCondimentQuantity(productCondimentDetailId, quantity) {
        return axios.put(`${API_URL}/update-condiment-receipt`, { productCondimentDetailId, quantity }, { headers: authHeader() })
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
    deleteCondiment(id) {
        return axios.delete(`${API_URL}/delete-condiment-receipt/${id}`, { headers: authHeader() })
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
    deleteOrder(id) {
        return axios.delete(`${API_URL}/delete-order/${id}`, { headers: authHeader() })
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
    removeCustomerReceipt(id) {
        return axios.put(`${API_URL}/remove-customer-receipt/${id}`, {}, { headers: authHeader() })
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
    checkGiftCustomer(customerId) {
        return axios.get(`${API_URL}/check-gift-customer/${customerId}`, { headers: authHeader() })
            .then(response => {
                if (response.data.code == 0) {
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

    addGiftCustomer(body) {
        return axios.post(`${API_URL}/add-gift-customer`, body, { headers: authHeader() })
            .then(response => {
                if (response.data.code == 0) {
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

export default new OrderService();