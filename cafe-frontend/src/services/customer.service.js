import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/customers";
class CustomerService {

    getListCustomer() {
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

    getCustomerById(id) {
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
    addCustomer(customer) {
        console.log(customer)
        return axios.post(`${API_URL}`, customer, { headers: authHeader() })
            .then(response => {
                return response.data.result
            })
            .catch(error => {
                console.error('There was an Customer!', error);
                throw error;
            });
    }
}

export default new CustomerService();