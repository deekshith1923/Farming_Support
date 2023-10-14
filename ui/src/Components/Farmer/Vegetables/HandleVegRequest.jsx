import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap"
import Navbar from '../../Navbar';
import { Link, useParams } from 'react-router-dom';
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

export default function HandleVegRequest() {
    const [vegetablesimage, setvegetablesimage] = useState([]);
    const [totalprice, setTotalPrice] = useState(0)
    const [vegetablesdetails, setvegetablesdetails] = useState({
        rent: "",
        vegetable_name: "",
        quantity: "",
        cost: 0,
        image: "",
        date: "",
    })

    const [requester, setRequesterDetails] = useState({
        requester_name: "",
        mobile: "",
        address: "",
        request_date: "",
        quantity: 0,
        status: "",
    })

    const { veg_id } = useParams();
    const { cust_id } = useParams();

    async function fetchlanddata(veg_id) {
        try {
            const farmer_id = localStorage.getItem('id');
            const response = await axios.get(`http://127.0.0.1:8000/api/handle_vegetables/${farmer_id}/${veg_id}/`);
            setvegetablesdetails(response.data[0])
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchlanddata(veg_id);
    }, [veg_id]);

    useEffect(() => {
        async function fetchrequesterdata(cust_id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/vegetables_requester_details/${cust_id}/`);
                setRequesterDetails(response.data);
                console.log(response.data)
            } catch (error) {

            }
        }
        fetchrequesterdata(cust_id);
    }, [cust_id]);


    useEffect(() => {
        async function fetchImageUrls() {
            if (vegetablesdetails.image.length > 0) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/vegetables_image${vegetablesdetails.image}/`, { responseType: 'blob' });
                    const urls = URL.createObjectURL(response.data);
                    setvegetablesimage(urls);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }

        }
        fetchImageUrls();
    }, [vegetablesdetails.image]);

    useEffect(() => {
        console.log(requester.quantity)
        console.log(vegetablesdetails.cost);
console.log([requester.quantity] * [vegetablesdetails.cost])
        setTotalPrice([requester.quantity] * [vegetablesdetails.cost])
    }, [requester.quantity, vegetablesdetails.cost]);

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


    const handleRequests = async (e, status) => {
        let formData = new FormData();
        formData.append('request_id', e);
        formData.append('vegetables_id', veg_id);
        formData.append('status', status);
        formData.append('req_quantity',requester.quantity );

        fetch(`http://127.0.0.1:8000/api/vegetables_response/`,
            { method: 'PUT', body: formData })
        fetchlanddata(veg_id);
        window.location.reload();
    }

    return (
        <>
            <Navbar />
            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='d-flex mt-0 mb-4 '>
                            <Link className='btn btn-primary me-5' to="/farmerhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Vegetables Requests</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody className='text-start'>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Vegetables Name</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={vegetablesdetails.vegetable_name}
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

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Available Quantity(Kg)</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='number' required value={vegetablesdetails.quantity}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Cost (Rs/Kg)</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='number' required value={vegetablesdetails.cost}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requester Name</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={requester.requester_name}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requester Address</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={requester.address}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requester Number</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={requester.mobile}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Quantity(Kg)</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={requester.quantity}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Total Price</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='number' required value={totalprice}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Date</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={convertToLocalDate(requester.request_date)}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Status</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={requester.status}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                            </tbody>
                        </Table>

                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={vegetablesimage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>

                        {requester.status === "Pending" &&
                            <div className=' d-flex justify-content-between mt-2'>
                                <button className=' btn btn-success w-100 m-3' onClick={(e) => handleRequests(requester.id, "Approved")}>Aprove <FaRegThumbsUp className='text-light' /> </button>
                                <button className='btn btn-danger w-100 m-3' onClick={(e) => handleRequests(requester.id, "Rejected")}>Reject <FaRegThumbsDown className='text-light' /> </button>
                            </div>
                        }

                    </div>

                </div>

            </div>
        </>
    )
}

