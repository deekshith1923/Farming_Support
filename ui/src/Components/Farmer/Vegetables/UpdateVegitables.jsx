import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function UpdateVegitables() {
    const [vegImage, setVegImage] = useState([]);
    const farmer_id = localStorage.getItem('id');
    const [vegdata, setVegData] = useState({
        farmer_name: "",
        mobile: "",
        vegetable_name: "",
        address: "",
        quantity: "",
        cost: ""
    })
    const veg_id = useSelector(state => state.Land)
    const vegetablesId = veg_id[veg_id.length - 1];
    
    useEffect(() => {
        async function fetchdata(farmer_id, vegetablesId) {
            if (vegetablesId > 0 && farmer_id > 0) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/update_vegetables/${farmer_id}/${vegetablesId}`);
                    setVegData(response.data[0]);
                } catch (error) {
                }
            }
        }
        fetchdata(farmer_id, vegetablesId);
    }, [farmer_id, vegetablesId]);

    const handleUpdate = () => {
        let formData = new FormData();
        for (let i = 0; i < vegImage.length; i++) {
            formData.append('image', vegImage[i]);
        }
        formData.append('farmer_name', vegdata.farmer_name);
        formData.append('mobile', vegdata.mobile);
        formData.append('address', vegdata.address);
        formData.append('vegetable_name', vegdata.vegetable_name);
        formData.append('quantity', vegdata.quantity);
        formData.append('cost', vegdata.cost);

        fetch(`http://127.0.0.1:8000/api/update_vegetables/${farmer_id}/${vegetablesId}`,
            { method: 'PUT', body: formData })
        alert("Updated Successfully");
        window.location.reload(false);
    };

    return (
        <>
            <form className='row w-75 mx-auto' onSubmit={handleUpdate}>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Name" value={vegdata.farmer_name}
                        onChange={(e) => setVegData({ ...vegdata, farmer_name: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="number" className="form-control" placeholder="Mobile" value={vegdata.mobile}
                        onChange={(e) => setVegData({ ...vegdata, mobile: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Address" value={vegdata.address}
                        onChange={(e) => setVegData({ ...vegdata, address: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Vegetables Name" value={vegdata.vegetable_name}
                        onChange={(e) => setVegData({ ...vegdata, vegetable_name: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Quantity(Kg)" value={vegdata.quantity}
                        onChange={(e) => setVegData({ ...vegdata, quantity: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Cost" value={vegdata.cost}
                        onChange={(e) => setVegData({ ...vegdata, cost: e.target.value })} />
                </div>

                <div className='mb-3'>
                    <input type="file" multiple className="form-control"
                        onChange={(e) => setVegImage(e.target.files)} />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-danger w-100">Update</button>
                </div>

            </form>
        </>
    )
}

