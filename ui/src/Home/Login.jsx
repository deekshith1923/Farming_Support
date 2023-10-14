import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import MainNav from "./MainNav";


export default function Login() {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const response = await axios.post("http://127.0.0.1:8000/api/login/", data)
            localStorage.setItem('Name', response.data.name);
            localStorage.setItem('Email', response.data.email);
            localStorage.setItem('id', response.data.id);
            if (response.data.role === "Farmer") {
                navigate("/farmerhome");
            }
            else if (response.data.role === "Admin") {
                navigate("/adhome");
            }
            else {
                navigate("/custhome");
            }
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };


    return (
        <>
            <MainNav />
            <div className="mt-5 vh-100 pt-5 w-100 mx-auto">

                <div className="row mx-auto  w-50  mt-4">
                    <div className="col-md-4 p-5 shadow-lg rounded-start-3" style={{ backgroundColor: "lightsalmon" }} >
                        <div className="text-center border bg-light p-3 mt-5 border-danger" style={{ borderRadius: "50%" }}>
                            <img src={Logo} height={75} width={75} alt="Logo" />
                        </div>

                    </div>
                    <div className="col-md-8 p-5 shadow-lg rounded-end-3" >
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center h3 text-dark pt-0 p-2">Login</h1>

                            <div className="mb-2 mt-0">
                                <input type="text" className="form-control  border-0 border-bottom rounded-0 shadow-none" id="name"
                                    name="email" required
                                    onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control border-0 border-bottom rounded-0 shadow-none" value={data.password} required
                                    onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-success btn-sm w-100 mb-1">Submit</button>
                            </div>
                            <div className="mb-2">
                                <span className="m-0">do not have an account?</span>
                            </div>
                            <div className="text-center mb-4">
                                <Link to="/register" className="btn btn-sm border w-100 ">Create Account</Link>
                            </div>
                            {error && <p className="error text-center text-danger">{error}</p>}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
