import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/report'; // replace with your server's address

class ReportService {

    getYearReport(year) {
        return axios.get(`${API_URL}/year-report/${year}`, { headers: authHeader() })
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

    getProductReport(start, end) {
        return axios.get(`${API_URL}/product-report?start=${start}&end=${end}`, { headers: authHeader() })
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

    getCondimentReport(start, end) {
        return axios.get(`${API_URL}/condiment-report?start=${start}&end=${end}`, { headers: authHeader() })
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

    getProductTypeReport(start, end) {
        return axios.get(`${API_URL}/product-type-report?start=${start}&end=${end}`, { headers: authHeader() })
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

export default new ReportService();
