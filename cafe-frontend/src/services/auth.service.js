import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/auth/";
class AuthService {


    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.result.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    introspect(token) {
        return axios
            .post(API_URL + "introspect", {
                token
            })
            .then(response => {
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();