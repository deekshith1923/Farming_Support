import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function RequestMachine() {

    const m_id = useSelector(state => state.Land)
    const machine_id = m_id[m_id.length - 1];


    const [data, setData] = useState({
        user_name: "",
        mobile: "",
        address: "",
        dateTime: "",
        rent: "",
    })

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append('farmer_id', localStorage.getItem('id'));
        formData.append('machine_id', machine_id);
        formData.append('farmer_name', data.user_name);
        formData.append('mobile', data.mobile);
        formData.append('address', data.address);
        formData.append('date', data.dateTime);
        formData.append('rent', data.rent);

        try {
            await axios.post('http://127.0.0.1:8000/api/add_machine_requests/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (error) {
        }
    };


    return (
        <form className='row w-75 mx-auto' onSubmit={handleSubmit}>

            <div className=' mb-3'>
                <input type="text" className="form-control" placeholder="Name"
                    onChange={(e) => setData({ ...data, user_name: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="number" className="form-control" placeholder="Mobile"
                    onChange={(e) => setData({ ...data, mobile: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="text" className="form-control" placeholder="Address"
                    onChange={(e) => setData({ ...data, address: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <label className='form-label form-label-sm'>Date Needed</label>
                <input type="datetime-local" className="form-control" placeholder="Start Date"
                    onChange={(e) => setData({ ...data, dateTime: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="number" className="form-control" placeholder="Cost Expecting"
                    onChange={(e) => setData({ ...data, rent: e.target.value })} />
            </div>

            <div className='text-center'>
                <button type="submit" className="btn btn-success w-100">Submit</button>
            </div>

        </form>
    )
}

