import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function MachineEdit() {

    const m_id = useSelector(state => state.Land)
    const machine_id = m_id[m_id.length - 1];

    const [machineDetails, setMachineDetails] = useState({
        owner_name: "",
        mobile: "",
        owner_address: "",
        machine_name: "",
        rent:"",
        details:"",
    })

    const [landImage, setLandImage] = useState([]);

    useEffect(() => {
            fetch(`http://127.0.0.1:8000/api/single_machine/${12}/`, { method: 'GET' })
                .then(response => response.json())
                .then(data => setMachineDetails(data))
                .catch(error => console.error('Error fetching product:', error));
        
    }, []);


    const handleUpdate = () => {

        let formData = new FormData();
        for (let i = 0; i < landImage.length; i++) {
            formData.append('image', landImage[i]);
        }

        formData.append('farmer_id', localStorage.getItem('id'));
        formData.append('farmer_name', machineDetails.farmer_name);
        formData.append('mobile', machineDetails.mobile);
        formData.append('address', machineDetails.address);
        formData.append('others', machineDetails.others);

        if (machine_id !== 0) {
            fetch(`http://127.0.0.1:8000/api/handle_machine/${machine_id}/`,
                { method: 'PUT', body: formData })
            alert("Updated Successfully");
            window.location.reload(false);
        }
    };

    return (
        <>
            <form className='row w-75 mx-auto' onSubmit={handleUpdate}>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Name" value={machineDetails.owner_name}
                        onChange={(e) => setMachineDetails({ ...machineDetails, farmer_name: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="number" className="form-control" placeholder="Mobile" value={machineDetails.mobile}
                        onChange={(e) => setMachineDetails({ ...machineDetails, mobile: e.target.value })} />
                </div>

                <div className=' mb-3'>
                    <input type="text" className="form-control" placeholder="Address" value={machineDetails.address}
                        onChange={(e) => setMachineDetails({ ...machineDetails, address: e.target.value })} />
                </div>

                <div className='mb-3'>
                    <textarea type="text" className="form-control" placeholder="Land Details" value={machineDetails.others}
                        onChange={(e) => setMachineDetails({ ...machineDetails, others: e.target.value })} />
                </div>

                <div className='mb-3'>
                    <input type="file" multiple className="form-control"
                        onChange={(e) => setLandImage(e.target.files)} />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-danger w-100">Update</button>
                </div>

            </form>
        </>
    )
}

export default MachineEdit