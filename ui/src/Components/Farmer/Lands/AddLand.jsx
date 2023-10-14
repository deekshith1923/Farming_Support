import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function AddLand() {

    const [landImage, setLandImage] = useState([]);
    const [error, setError] = useState(null);

    const [landDetails, setLandDetails] = useState({
        name: "",
        mobile: "",
        address: "",
        details: "",
        rent: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < landImage.length; i++) {
            formData.append('image', landImage[i]);
        }
        formData.append('farmer_id', localStorage.getItem('id'));
        formData.append('farmer_name', landDetails.name);
        formData.append('mobile', landDetails.mobile);
        formData.append('address', landDetails.address);
        formData.append('others', landDetails.details);
        formData.append('rent', landDetails.rent);
        try {
            await axios.post('http://127.0.0.1:8000/api/addland/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setLandDetails({
                name: "",
                mobile: "",
                address: "",
                details: "",
                rent: "",
            });
            toast.success('Land Added Successfully', {
                position: toast.POSITION.TOP_CENTER
            });
            setError(null);
            window.location.reload();
        } catch (error) {
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='p-5 w-100  mx-auto'>
                <div className='mx-auto w-50 p-4 card shadow'>
                    <form onSubmit={handleSubmit} className=' w-100 mb-0'>
                        <h3 className='text-center text-primary mb-3'>Add Land</h3>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <input type="text" className="form-control" placeholder="Farmer Name"
                                    onChange={(e) => setLandDetails({ ...landDetails, name: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <input type="tel" className="form-control" placeholder="Mobile Number"
                                    onChange={(e) => setLandDetails({ ...landDetails, mobile: e.target.value })} />
                            </div>
                        </div>

                        <div className=' mb-3'>
                            <input type="text" className="form-control" placeholder="Address"
                                onChange={(e) => setLandDetails({ ...landDetails, address: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <textarea type="text" className="form-control" placeholder="Land Details"
                                onChange={(e) => setLandDetails({ ...landDetails, details: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="number" className="form-control" placeholder="Rent(/6 Month)"
                                onChange={(e) => setLandDetails({ ...landDetails, rent: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="file" multiple className="form-control"
                                onChange={(e) => setLandImage(e.target.files)} />
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

