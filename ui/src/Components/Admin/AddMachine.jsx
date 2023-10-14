import React, { useState } from 'react';
import axios from "axios";
export default function AddMachine() {

    const [machineImage, setMachineImage] = useState([]);
    const [error, setError] = useState(null);
    const [machineDetails, setMachineDetails] = useState({
        name: "",
        machine_name: "",
        mobile: "",
        address: "",
        rent: "",
        details: ""
    })

    const handleSubmit = async () => {

        const formData = new FormData();
        for (let i = 0; i < machineImage.length; i++) {
            formData.append('image', machineImage[i]);
        }

        formData.append('admin_id', localStorage.getItem('id'));
        formData.append('owner_name', machineDetails.name);
        formData.append('machine_name', machineDetails.machine_name);
        formData.append('details', machineDetails.details);
        formData.append('mobile', machineDetails.mobile);
        formData.append('owner_address', machineDetails.address);
        formData.append('rent', machineDetails.rent);

        try {
            await axios.post('http://127.0.0.1:8000/api/addmachine/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            window.location.reload(false);
            setError(null);

        } catch (error) {
        }
    };

    return (
        <>
            <div className='p-5 w-100  mx-auto'>
                <div className='mx-auto w-50 p-4 card shadow'>
                    <form onSubmit={handleSubmit} className=' w-100 mb-0'>
                    <h4 className='text-center text-primary mb-3'>Add Machine</h4>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <input type="text" className="form-control " placeholder="Owner Name"
                                    onChange={(e) => setMachineDetails({ ...machineDetails, name: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <input type="number" className="form-control " placeholder="Owner Number"
                                    onChange={(e) => setMachineDetails({ ...machineDetails, mobile: e.target.value })} />
                            </div>
                        </div>

                        <div className=' mb-3'>
                            <input type="text" className="form-control " placeholder="Owner Address"
                                onChange={(e) => setMachineDetails({ ...machineDetails, address: e.target.value })} />
                        </div>

                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <input type="text" className="form-control " placeholder="Machine Name"
                                    onChange={(e) => setMachineDetails({ ...machineDetails, machine_name: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <input type="number" className="form-control " placeholder="Rent"
                                    onChange={(e) => setMachineDetails({ ...machineDetails, rent: e.target.value })} />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <textarea type="text" className="form-control " placeholder="Machine Details"
                                onChange={(e) => setMachineDetails({ ...machineDetails, details: e.target.value })} />
                        </div>

                        <div className='mb-3'>
                            <input type="file" multiple className="form-control form-control-lg fs-6"
                                onChange={(e) => setMachineImage(e.target.files)} />
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary w-50">Submit</button>
                        </div>

                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>

        </>
    )
}

