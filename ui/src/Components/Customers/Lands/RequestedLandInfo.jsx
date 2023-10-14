import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ToastContainer } from 'react-toastify';
import { Table } from 'react-bootstrap';


export default function RequestedLandInfo() {
    const [landImage, setLandImage] = useState([]);
    const [landsdata, setLandsData] = useState({
        farmer_name: "",
        mobile: "",
        address: "",
        others: "",
        rent: "",
        image: '0',
    })

    const [requestdata, setRequestData] = useState({
        date: "",
        cost: "",
        start_date: "",
        end_date: "",
        status: ""
    })

    const { land_id } = useParams();

    useEffect(() => {
        async function fetchdata(land_id) {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/requested_single_land/${land_id}/`);
                setLandsData(response.data.land_details)
                setRequestData(response.data.request_details)
            } catch (error) {

            }
        }
        fetchdata(land_id);
    }, [land_id]);

    useEffect(() => {
        async function fetchImageUrls() {
            if (landsdata.image.length === 0) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/land_image${landsdata.image}/`, { responseType: 'blob' });
                console.log("response", response.data)
                const urls = URL.createObjectURL(response.data);
                setLandImage(urls);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImageUrls();
    }, [landsdata.image]);




    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='d-flex mt-0 mb-4 '>
                            <Link className='btn btn-primary me-5' to="/custhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Land Details</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Famer Name</td>
                                    <td width={'60%'} className='ps-5'>{landsdata.farmer_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                    <td width={'60%'} className='ps-5'>{landsdata.mobile}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                    <td width={'60%'} className='ps-5'>{landsdata.address}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Land Rent</td>
                                    <td width={'60%'} className='ps-5'>{landsdata.rent}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Details</td>
                                    <td width={'60%'} className='ps-5'>{landsdata.others}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Date</td>
                                    <td width={'60%'} className='ps-5'>{requestdata.date}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Your Rent</td>
                                    <td width={'60%'} className='ps-5'>{requestdata.cost}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold'>Rent Start Date</td>
                                    <td width={'60%'} className='ps-5'>{requestdata.start_date}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Rent End Date</td>
                                    <td width={'60%'} className='ps-5'>{requestdata.end_date}</td>
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
                            <img src={landImage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

