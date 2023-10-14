import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ToastContainer } from 'react-toastify';
import RequestVegetables from './RequestVegetables';

export default function SingleVegetables() {
    const modalRef = useRef(null);
    const [vegetableId,setVegetableId]=useState(0);
    const [vegetablesImage, setvegetablesImage] = useState([]);
    const [vegetabesdetails, setVetablesDetails] = useState({
        farmer_name: "",
        mobile: "",
        address: "",
        vegetable_name: "",
        cost: "",
        quantity:0,
        image: '0',
    })
    const { veg_id } = useParams();

    useEffect(() => {
        async function fetchdata(veg_id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/single_vegetables/${veg_id}/`);
                setVetablesDetails(response.data[0])
                setVegetableId(response.data[0].id);
            } catch (error) {

            }
        }
        fetchdata(veg_id);
    }, [veg_id]);

    useEffect(() => {
        async function fetchImageUrls() {
            if (vegetabesdetails.image.length === 0) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/vegetables_image${vegetabesdetails.image}/`, { responseType: 'blob' });
                console.log("response", response.data)
                const urls = URL.createObjectURL(response.data);
                setvegetablesImage(urls);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImageUrls();
    }, [vegetabesdetails.image]);

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
                        <div className='d-flex mt-0 mb-5 '>
                            <Link className='btn btn-primary me-5' to="/custhome">Back</Link>
                            <h5 className='text-center ms-5 mt-1 ps-5 fs-4'>Vegetables Details</h5>
                        </div>

                        <Table bordered width={'100%'}>
                            <tbody className='text-start'>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Famer Name</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.farmer_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Mobile</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.mobile}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Address</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.address}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Vegetable</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.vegetable_name}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Available Quantity(Kg)</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.quantity}</td>
                                </tr>
                                <tr className='lh-lg'>
                                    <td width={'40%'} className='fw-bold ps-3'>Cost (/Kg)</td>
                                    <td width={'60%'} className='ps-5'>{vegetabesdetails.cost}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='text-center mt-5'>
                            <button type="submit" onClick={(e) => openModal(vegetabesdetails.id)} className="btn btn-success">Request Vegetables</button>
                        </div>
                    </div>

                    <div className='col-md-6 border p-5'>
                        <div className='text-center m-5'>
                            <img src={vegetablesImage} alt="Card cap" style={{ height: "450px", width: "450px" }} />
                        </div>
                    </div>

                </div>

                {/* Modal Form */}
                <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header ">
                                <h5 className="modal-title mx-auto " id="exampleModalLabel">Fill Details</h5>
                            </div>
                            <div className="modal-body">
                                <RequestVegetables veg_id={vegetableId} quantity={vegetabesdetails.quantity} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

