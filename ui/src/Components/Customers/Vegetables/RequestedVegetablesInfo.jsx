import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ToastContainer } from 'react-toastify';
import { Table } from 'react-bootstrap';

export default function RequestedVegetablesInfo() {
    const [vegetablesImage, setvegetablesImage] = useState([]);
    const [totalprice, setTotalPrice] = useState(0)
    const [vegetablesdetails, setVegetablesDetails] = useState({
        farmer_name: "",
        mobile: "",
        address: "",
        vegetable_name: "",
        cost: "",
        image: '0',
    })

    const [requestdata, setRequestData] = useState({
        request_date: "",
        status: "",
        quantity: 0
    })

    const { veg_id } = useParams();

    useEffect(() => {
        async function fetchdata(veg_id) {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/requested_single_vegetables/${veg_id}/`);
                console.log("hello", response.data)
                setVegetablesDetails(response.data.vegetables_details)
                setRequestData(response.data.request_details)
            } catch (error) {

            }
        }
        fetchdata(veg_id);
    }, [veg_id]);

    useEffect(() => {
        async function fetchImageUrls() {
            if (vegetablesdetails.image.length === 0) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/vegetables_image${vegetablesdetails.image}/`, { responseType: 'blob' });
                console.log("response", response.data)
                const urls = URL.createObjectURL(response.data);
                setvegetablesImage(urls);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImageUrls();
    }, [vegetablesdetails.image]);

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

    useEffect(() => {
        setTotalPrice([vegetablesdetails.cost] * [requestdata.quantity])
    }, [vegetablesdetails.cost, requestdata.quantity])

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='d-flex mt-0 mb-4 '>
                            <Link className='btn btn-primary me-5' to="/custhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Vegetables Details</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Famer Name</td>
                                    <td width={'60%'} className='ps-5'>{vegetablesdetails.farmer_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                    <td width={'60%'} className='ps-5'>{vegetablesdetails.mobile}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                    <td width={'60%'} className='ps-5'>{vegetablesdetails.address}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Vegetables</td>
                                    <td width={'60%'} className='ps-5'>{vegetablesdetails.vegetable_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Vegetables Price(Rs/Kg)</td>
                                    <td width={'60%'} className='ps-5'>{vegetablesdetails.cost}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Date</td>
                                    <td width={'60%'} className='ps-5'>{convertToLocalDate(requestdata.request_date)}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Quantity(Kg)</td>
                                    <td width={'60%'} className='ps-5'>{requestdata.quantity}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Price(Rs)</td>
                                    <td width={'60%'} className='ps-5'>{totalprice}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Status</td>
                                    <td width={'60%'}
                                        className={`${requestdata.status === "Pending" ? 'text-primary ps-5 fw-bold' : (requestdata.status === "Approved" ? "text-success ps-5 fw-bold" : ("text-danger ps-5 fw-bold"))}`}>{requestdata.status}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={vegetablesImage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

