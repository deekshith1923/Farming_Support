import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png"
import MainNav from "./MainNav";
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
// import {USER_REGISTER} from "../utils/constants";

export default function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.role === '') {
            setError('Please select a role.');
        } else {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", data);
            if (response.status === 200) {
                window.location.reload();
                setData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: '',
                });
                toast.success(response.data.message + '!', {
                    position: toast.POSITION.TOP_CENTER
                });

            } else {
                toast.error(response.data.errors + '?', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            setError('');
        }
    };

    const handleSelectChange = (e) => {
        setData({ ...data, role: e.target.value })
    }

    return (
        <>
            <MainNav />
            <ToastContainer />

            <div className="mt-5 vh-100 pt-4 w-100 mx-auto" style={{ backgroundColor: "aliceblue" }}>

                <div className="row mx-auto border w-50 shadow mt-4">
                    <div className="col-md-4 p-5" style={{ backgroundColor: "lightsalmon" }} >
                        <div className="text-center border bg-light p-3 mt-5 border-danger" style={{ borderRadius: "50%" }}>
                            <img src={Logo} height={75} width={75} alt="Logo" />
                        </div>

                    </div>
                    <div className="col-md-8 p-5 bg-white" >
                        <form onSubmit={handleSubmit}>
                            <h1 className="h3 text-center">Register</h1>
                            {error && <p className="text-danger mt-1 mb-1">{error}</p>}
                            <div className="mb-2 pt-2">
                                <input type="text" className="form-control border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Username" />
                            </div>

                            <div className="mb-2">
                                <input type="email" className="form-control border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                            </div>

                            <div className="mb-2">
                                <input type="tel" className="form-control border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="Phone Number" />
                            </div>

                            <div className="mb-2">
                                <input type="password" className="form-control border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                            </div>
                            <div className='mb-2 w-100 float-start '>
                                <Form.Select size="sm" className="form-control border-0 border-bottom rounded-0 shadow-none" required
                                    value={data.role} onChange={handleSelectChange}>
                                    <option value={""}>Select Role</option>
                                    <option value={"Farmer"}>Farmer</option>
                                    <option value={"Customer"}>Customer</option>
                                </Form.Select>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-sm w-100">Submit</button>
                            </div>
                            <div className="mb-2">
                                <span>Already have an account?</span>
                            </div>
                            <div className="text-center">
                                <Link to="/login" className="btn btn-sm border w-100 ">Sign in</Link>
                            </div>

                        </form>

                    </div>
                </div >
            </div >


        </>

    );
}
