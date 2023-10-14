import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function RequestVegetables(props) {

    const { veg_id } = props;
    const { quantity } = props;
    const [data, setData] = useState({
        requester_name: "",
        mobile: "",
        address: "",
        quantity: 0,
    })

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('requester_id', localStorage.getItem('id'));
        formData.append('vegetables_id', veg_id);
        formData.append('requester_name', data.requester_name);
        formData.append('mobile', data.mobile);
        formData.append('quantity', data.quantity);
        formData.append('address', data.address);
        if (quantity >= [data.quantity]) {
            try {
                await axios.post('http://127.0.0.1:8000/api/add_vegetables_requests/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            } catch (error) {
            }
        }
        else {
            alert("Quantity Is More Than Availble")
        }
    };

    return (
        <form className='row w-75 mx-auto' onSubmit={handleSubmit}>

            <div className=' mb-3'>
                <input type="text" className="form-control" placeholder="Name"
                    onChange={(e) => setData({ ...data, requester_name: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="number" className="form-control" placeholder="Mobile"
                    onChange={(e) => setData({ ...data, mobile: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="number" className="form-control" placeholder="Quantity(Kg)"
                    onChange={(e) => setData({ ...data, quantity: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="text" className="form-control" placeholder="Address"
                    onChange={(e) => setData({ ...data, address: e.target.value })} />
            </div>

            <div className='text-center'>
                <button type="submit" className="btn btn-success w-100">Submit</button>
            </div>

        </form>
    )
}

