import axios from "axios";
import authHeader from "./authHeader";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/receipt";
class ReceiptService {

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

}

export default new ReceiptService();