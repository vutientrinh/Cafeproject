import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service"
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        AuthService.login(username, password).then(
            (data) => {
                const decodedToken = jwtDecode(data.result.token);
                const userRole = decodedToken.scope;

                switch (userRole) {
                    case 'MANAGER':
                        navigate("/manager/home");
                        break;
                    case 'ADMIN':
                        navigate("/admin");
                        break;
                    case 'STAFF':
                        navigate("/staff");
                        break;
                    default:
                        navigate("/");
                }

                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                alert(resMessage);
            }
        );
    };

    return (
        <div className="SignInPage">
            <div className="container py-5 h-auto">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://th.bing.com/th/id/OIP.GGKTC8EqZA81L_KBvEqNWgHaHa?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.GGKTC8EqZA81L_KBvEqNWgHaHa?rs=1&pid=ImgDetMain" alt="logo" className="w-50 rounded-circle"></img>
                                            <h4 className="mt-1 mb-5 pb-1">We are DUYAYVY coffee shop</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <p className="text-center">Please login to your account</p>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                    placeholder="Your staff username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                                <input type="password" id="form2Example22" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="text-center pt-1 mb-2 align-items-center">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 px-3 ml-5"
                                                    type="submit">Login</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 ">
                                        <h3 className="mb-4 d-flex align-items-center justify-content-center">Caffeine and Kindness</h3>
                                        <p className="small mb-0 text-center ">Feel free to use it or let me know if you’d like more options!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
