import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap"
import Navbar from '../../Navbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


export default function HandleVegetables() {
    const navigate = useNavigate()
    const [vegetablesimage, setvegetablesimage] = useState([]);
    const [vegimage, setvegimage] = useState([]);
    const [edit, setEdit] = useState(false);
    const [vegetablesdetails, setvegetablesdetails] = useState({
        farmer_name: "",
        mobile: "",
        address: "",
        cost: "",
        quantity:"",
        image: "",
        date:"",
        vegetable_name:""
    })

    const { vegetables_id } = useParams();
    useEffect(() => {
        async function fetchdata(vegetables_id) {
            try {
                const farmer_id = localStorage.getItem('id');
                const response = await axios.get(`http://127.0.0.1:8000/api/handle_vegetables/${farmer_id}/${vegetables_id}/`);
                console.log("hello", response.data[0])
                setvegetablesdetails(response.data[0])
            } catch (error) {

            }
        }
        fetchdata(vegetables_id);
    }, [vegetables_id]);


    useEffect(() => {
        async function fetchImageUrls() {
            if (vegetablesdetails.image.length > 0) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/vegetables_image${vegetablesdetails.image}/`, { responseType: 'blob' });
                    console.log("response", response.data)
                    const urls = URL.createObjectURL(response.data);
                    setvegetablesimage(urls);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }

        }
        fetchImageUrls();
    }, [vegetablesdetails.image]);

    const handleUpdate = () => {
        let formData = new FormData();
        const farmer_id = localStorage.getItem('id');
        for (let i = 0; i < vegimage.length; i++) {
            formData.append('image', vegimage[i]);
        }
        formData.append('farmer_name', vegetablesdetails.farmer_name);
        formData.append('mobile', vegetablesdetails.mobile);
        formData.append('address', vegetablesdetails.address);
        formData.append('vegetable_name', vegetablesdetails.vegetable_name);
        formData.append('quantity', vegetablesdetails.quantity);
        formData.append('cost', vegetablesdetails.cost);

        fetch(`http://127.0.0.1:8000/api/handle_vegetables/${farmer_id}/${vegetables_id}/`,
            { method: 'PUT', body: formData })
        toast.success('Land Updated Succesfully..', {
            position: toast.POSITION.TOP_RIGHT
        });
        window.location.reload()
    };

    const handleDelete = async (vegetables_id) => {
        try {
            const data = window.confirm("Are You Sure")
            if (data === true) {
                const farmer_id = localStorage.getItem('id');
                await axios.delete(`http://127.0.0.1:8000/api/handle_vegetables/${farmer_id}/${vegetables_id}/`);
                navigate("/farmerhome");
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    const convertToLocalDate = (localDate) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const date = new Date(localDate);
        return date.toLocaleString('en-US', options);
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='d-flex mt-0 mb-4 '>
                            <Link className='btn btn-primary me-5' to="/farmerhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Land Details</h5>
                            <button className='btn btn-light shadow-none border-0 ms-2 text-success' onClick={() => setEdit(true)}><BiEdit /></button>
                            <button className='btn btn-light shadow-none border-0 ms-2 text-danger' onClick={() => handleDelete(vegetables_id)}><MdDeleteOutline /></button>
                        </div>

                        {edit === true ?
                            (<div>
                                <Table bordered width={'100%'}>
                                    <tbody className='text-start'>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Farmer Name</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={vegetablesdetails.farmer_name}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails, farmer_name: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='tel' required value={vegetablesdetails.mobile}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails, mobile: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={vegetablesdetails.address}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails, address: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Vegetable</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={vegetablesdetails.vegetable_name}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails, vegetable_name: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Quantity(Kg)</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='number' required value={vegetablesdetails.quantity}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails,  quantity: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Price(Rs/Kg)</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='number' required value={vegetablesdetails.cost}
                                                    className='form-control border-0 shadow-none' readOnly={false}
                                                    onChange={(e) => setvegetablesdetails({ ...vegetablesdetails,  cost: e.target.value })} />
                                            </td>
                                        </tr>

                                        <tr className='lh-lg'>
                                            <td width={'40%'} className='fw-bold ps-3'>Added Date</td>
                                            <td width={'60%'} className='ps-5'>
                                                <input type='text' required value={convertToLocalDate(vegetablesdetails.date)}
                                                    className='form-control border-0 shadow-none' readOnly={true}/>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>
                                <div className='d-flex justify-content-between mt-5'>
                                    <button type="reset" onClick={() => setEdit(false)} className="btn btn-primary">Cancel</button>
                                    <button type="submit" onClick={(e) => handleUpdate(vegetablesdetails.id)} className="btn btn-success">Update Details</button>
                                </div>
                            </div>) :
                            (<Table bordered width={'100%'}>
                                <tbody className='text-start'>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Farmer Name</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={vegetablesdetails.farmer_name}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='tel' required value={vegetablesdetails.mobile}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={vegetablesdetails.address}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Vegetable</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={vegetablesdetails.vegetable_name}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Quantity(Kg)</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={vegetablesdetails.quantity}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Price(Rs/Kg)</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={vegetablesdetails.cost}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                    <tr className='lh-lg'>
                                        <td width={'40%'} className='fw-bold ps-3'>Added Date</td>
                                        <td width={'60%'} className='ps-5'>
                                            <input type='text' required value={convertToLocalDate(vegetablesdetails.date)}
                                                className='form-control border-0 shadow-none' readOnly={true} />
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>)
                        }
                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={vegetablesimage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>

                        {edit === true &&
                            <div className='d-flex justify-content-center align-item-center ms-5'>
                                <input type='file' multiple
                                    className='form-control' readOnly={false}
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files);
                                        setvegimage(selectedFiles)
                                    }} />
                            </div>
                        }
                    </div>



                </div>

            </div>
        </>
    )
}

