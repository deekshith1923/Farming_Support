import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function RequestLand(props) {

    const { land_id } = props;

    const [data, setData] = useState({
        user_name: "",
        mobile: "",
        address: "",
        start_date: "",
        end_date: "",
        cost: "",
    })

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('id'));
        formData.append('land_id', land_id);
        formData.append('user_name', data.user_name);
        formData.append('mobile', data.mobile);
        formData.append('address', data.address);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('cost', data.cost);

        try {
            await axios.post('http://127.0.0.1:8000/api/add_land_requests/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (error) {
        }
    };


    return (
        <form className=' w-75 mx-auto' onSubmit={handleSubmit}>

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
                <input type="date" className="form-control" placeholder="Start Date"
                    onChange={(e) => setData({ ...data, start_date: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="date" className="form-control" placeholder="End Date"
                    onChange={(e) => setData({ ...data, end_date: e.target.value })} />
            </div>

            <div className=' mb-3'>
                <input type="number" className="form-control" placeholder="Cost"
                    onChange={(e) => setData({ ...data, cost: e.target.value })} />
            </div>

            <div className='text-center'>
                <button type="submit" className="btn btn-success w-100">Submit</button>
            </div>

        </form>
    )
}

