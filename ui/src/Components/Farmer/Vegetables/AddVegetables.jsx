import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function AddVegetables() {

    const [vegetablesImage, setVegetablesImage] = useState([]);
    const [error, setError] = useState(null);
    const [vegetables, setVegetables] = useState({
        name: "",
        mobile: "",
        address: "",
        quantity: "",
        cost: "",
        vegetable_name: ""
    })

    const handleSubmit = async () => {
        const formData = new FormData();
        for (let i = 0; i < vegetablesImage.length; i++) {
            formData.append('image', vegetablesImage[i]);
        }
        formData.append('farmer_id', localStorage.getItem('id'));
        formData.append('farmer_name', vegetables.name);
        formData.append('mobile', vegetables.mobile);
        formData.append('vegetable_name', vegetables.vegetable_name);
        formData.append('address', vegetables.address);
        formData.append('quantity', vegetables.quantity);
        formData.append('cost', vegetables.cost);
        try {
            await axios.post('http://127.0.0.1:8000/api/add_vegetables/', formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            })
            toast.success('Vegetables Added Successfully', {
                position: toast.POSITION.TOP_CENTER
            });
            window.location.reload(false);
            setError(null);
        } catch (error) {
        }
    };


    return (
        <>
            <ToastContainer />
            <div className='p-5 w-100  mx-auto'>
                <div className='mx-auto w-50 p-4 card shadow'>
                    <form onSubmit={handleSubmit} className=' w-100 mb-0'>
                        <h3 className='text-center text-primary mb-3'>Add Vegetables</h3>
                        <div className=' mb-3'>
                            <input type="text" className="form-control" placeholder="Farmer Name"
                                onChange={(e) => setVegetables({ ...vegetables, name: e.target.value })} />
                        </div>

                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <input type="tel" className="form-control" placeholder="Mobile Number"
                                    onChange={(e) => setVegetables({ ...vegetables, mobile: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <input type="text" className="form-control" placeholder="Address"
                                    onChange={(e) => setVegetables({ ...vegetables, address: e.target.value })} />
                            </div>
                        </div>

                        <div className=' mb-3'>
                            <input type="text" className="form-control" placeholder="Vegetable Name"
                                onChange={(e) => setVegetables({ ...vegetables, vegetable_name: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="number" className="form-control" placeholder="Quantity(Kg)"
                                onChange={(e) => setVegetables({ ...vegetables, quantity: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="number" className="form-control" placeholder="Cost/Kg"
                                onChange={(e) => setVegetables({ ...vegetables, cost: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="file" multiple className="form-control"
                                onChange={(e) => setVegetablesImage(e.target.files)} />
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </div>

                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </>
    )
}

