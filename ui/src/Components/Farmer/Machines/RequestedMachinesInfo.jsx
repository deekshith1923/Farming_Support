import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ToastContainer } from 'react-toastify';
import { Table } from 'react-bootstrap';

export default function RequestedMachinesInfo() {
    const [machinesImage, setmachinesImage] = useState([]);
    const [machinedetails, setmachinedetails] = useState({
        owner_name: "",
        owner_address:"",
        mobile: "",
        machine_name: "",
        rent: "",
        image: '0',
    })

    const [requestdata, setRequestData] = useState({
        date: "",
        status: ""
    })

    const { machine_id } = useParams();

    useEffect(() => {
        async function fetchdata(machine_id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/requested_single_machine/${machine_id}/`);
                console.log("hello", response.data)
                setmachinedetails(response.data.machine_details)
                setRequestData(response.data.request_details)
            } catch (error) {

            }
        }
        fetchdata(machine_id);
    }, [machine_id]);

    useEffect(() => {
        async function fetchImageUrls() {
            if (machinedetails.image.length === 0) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/machine_image${machinedetails.image}/`, { responseType: 'blob' });
                console.log("response", response.data)
                const urls = URL.createObjectURL(response.data);
                setmachinesImage(urls);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        fetchImageUrls();
    }, [machinedetails.image]);

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
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Machines Details</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Owner Name</td>
                                    <td width={'60%'} className='ps-5'>{machinedetails.owner_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Owner Address</td>
                                    <td width={'60%'} className='ps-5'>{machinedetails.owner_address}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                    <td width={'60%'} className='ps-5'>{machinedetails.mobile}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Machine</td>
                                    <td width={'60%'} className='ps-5'>{machinedetails.machine_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Requested Date</td>
                                    <td width={'60%'} className='ps-5'>{convertToLocalDate(requestdata.date)}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Rent</td>
                                    <td width={'60%'} className='ps-5'>{machinedetails.rent}</td>
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
                            <img src={machinesImage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

