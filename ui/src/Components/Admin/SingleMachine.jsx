import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap"
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


export default function SingleMachine() {
    const navigate = useNavigate()
    const [machineimage, setmachineimage] = useState([]);
    const [machImage, setMachImage] = useState([]);
    const [edit, setEdit] = useState(false);
    const [machinedetails, setMachineDetails] = useState({
        owner_name: "",
        mobile: "",
        owner_address: "",
        machine_name: "",
        rent: "",
        details: "",
        image: "",
    })
    const { machine_id } = useParams();

    useEffect(() => {
        async function fetchdata(machine_id) {
            try {
                const admin_id = localStorage.getItem('id');
                const response = await axios.get(`http://127.0.0.1:8000/api/handle_machine/${admin_id}/${machine_id}/`);
                console.log("hello", response.data[0])
                setMachineDetails(response.data[0])
            } catch (error) {

            }
        }
        fetchdata(machine_id);
    }, [machine_id]);


    useEffect(() => {
        async function fetchImageUrls() {
            if (machinedetails.image.length > 0) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/machine_image${machinedetails.image}/`, { responseType: 'blob' });
                    console.log("response", response.data)
                    const urls = URL.createObjectURL(response.data);
                    setmachineimage(urls);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }

        }
        fetchImageUrls();
    }, [machinedetails.image]);

    const handleUpdate = () => {
        let formData = new FormData();
        const admin_id = localStorage.getItem('id');
        for (let i = 0; i < machImage.length; i++) {
            formData.append('image', machImage[i]);
        }
        formData.append('owner_name', machinedetails.owner_name);
        formData.append('machine_name', machinedetails.machine_name);
        formData.append('details', machinedetails.details);
        formData.append('mobile', machinedetails.mobile);
        formData.append('owner_address', machinedetails.owner_address);
        formData.append('rent', machinedetails.rent);
        fetch(`http://127.0.0.1:8000/api/handle_machine/${admin_id}/${machine_id}/`,
            { method: 'PUT', body: formData })
        toast.success('Land Updated Succesfully..', {
            position: toast.POSITION.TOP_RIGHT
        });
        window.location.reload()
    };

    const handleDelete = async (machine_id) => {
        try {
            const data = window.confirm("Are You Sure")
            if (data === true) {
                const admin_id = localStorage.getItem('id');
                await axios.delete(`http://127.0.0.1:8000/api/handle_machine/${admin_id}/${machine_id}/`);
                navigate("/adhome");
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='d-flex mt-0 mb-4 '>
                            <Link className='btn btn-primary me-5' to="/adhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Machine Details</h5>
                            <button className='btn btn-light shadow-none border-0 ms-2 text-success' onClick={() => setEdit(true)}><BiEdit /></button>
                            <button className='btn btn-light shadow-none border-0 ms-2 text-danger' onClick={() => handleDelete(machine_id)}><MdDeleteOutline /></button>
                        </div>

                        {edit === true ?
                            (<div>
                                <Table bordered width={'100%'}>
                                    <tbody className='text-start'>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Owner Name</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={machinedetails.owner_name}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, owner_name: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='tel' required value={machinedetails.mobile}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, mobile: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={machinedetails.owner_address}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, owner_address: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Machine</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={machinedetails.machine_name}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, machine_name: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Rent (/Hour)</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='number' required value={machinedetails.rent}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, rent: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Machine Details</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={machinedetails.details}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setMachineDetails({ ...machinedetails, details: e.target.value })} />
                                            </td>
                                        </tr>



                                    </tbody>
                                </Table>
                                <div className='d-flex justify-content-between mt-5'>
                                    <button type="reset" onClick={() => setEdit(false)} className="btn btn-primary">Cancel</button>
                                    <button type="submit" onClick={(e) => handleUpdate(machinedetails.id)} className="btn btn-success">Update Details</button>
                                </div>
                            </div>) :
                            (<Table bordered width={'100%'}>
                                <tbody className='text-start'>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Owner Name</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={machinedetails.owner_name}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='tel' required value={machinedetails.mobile}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={machinedetails.owner_address}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Machine</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={machinedetails.machine_name}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Rent (/Hour)</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='number' required value={machinedetails.rent}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Machine Details</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={machinedetails.details}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>)
                        }
                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={machineimage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>

                        {edit === true &&
                            <div className='d-flex justify-content-center align-item-center ms-5'>
                                <input type='file' multiple
                                    className='form-control' readOnly={false}
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files);
                                        setMachImage(selectedFiles)
                                    }} />
                            </div>
                        }
                    </div>



                </div>

            </div>
        </>
    )
}

