import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ToastContainer } from 'react-toastify';
import RequestLand from './RequestLand';
import { Table } from 'react-bootstrap';


export default function SingleLand() {
    const modalRef = useRef(null);
    const [landImage, setLandImage] = useState([]);
    const [landid,setLandId]=useState(0);
    const [landsdata, setLandsData] = useState({
        farmer_name: "",
        mobile: "",
        address: "",
        others: "",
        rent: "",
        image: '0',
        date:"",
    })
    const { land_id } = useParams();

    useEffect(() => {
        async function fetchdata(land_id) {
            try {
                console.log(land_id)
                const response = await axios.get(`http://127.0.0.1:8000/api/single_lands/${land_id}/`);
                setLandsData(response.data[0]);
                setLandId(response.data[0].id)
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
                const urls = URL.createObjectURL(response.data);
                setLandImage(urls);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImageUrls();
    }, [landsdata.image]);

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

    const openModal = async (e) => {
        if (modalRef.current) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className='mt-5 pt-4 pb-3' style={{ backgroundColor: "aliceblue" }}>
                <div className='row m-3 bg-white'>
                    <div className='col-md-6 border border-end-0 p-5'>
                        <div className='text-center mt-0 mb-4 '>
                            <h5 className='fs-4'>Land Details</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody className='text-start'>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Farmer Name</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={landsdata.farmer_name}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='tel' required value={landsdata.mobile}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={landsdata.address}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Rent</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='number' required value={landsdata.rent}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Details</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={landsdata.others}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Added Date</td>
                                    <td width={'60%'} className='ps-5'>
                                        <input type='text' required value={convertToLocalDate(landsdata.date)}
                                            className='form-control border-0 shadow-none' readOnly={true} />
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                        <div className='d-flex pt-3 justify-content-between'>
                            <Link className='btn btn-primary w-25' to="/custhome">Back</Link>
                            <button type="submit" onClick={(e) => openModal(landsdata.id)} className="btn btn-success">Request Land</button>
                        </div>

                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={landImage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>
                    </div>
                    
                </div>

            </div>

            {/* Modal Form */}
            <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5 className="modal-title mx-auto " id="exampleModalLabel">Request Land(Rent)</h5>
                        </div>
                        <div className="modal-body">
                            <RequestLand land_id={landid} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

