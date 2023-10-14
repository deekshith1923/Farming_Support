import React from 'react';
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import { GrAdd } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { add } from '../../../Redux/slice/cartSlice';
import RequestMachine from './RequestMachine';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function MachineAvailable() {
    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([])
    const dispatch = useDispatch();

    const modalRef = useRef(null);
    const openModal = async (e) => {
        dispatch(add(e));
        if (modalRef.current) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    };


    useEffect(() => {
        async function fetchdata() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_machines/');
                setData(response.data);
            } catch (error) {
            }
        }
        fetchdata();
    }, []);


    useEffect(() => {
        async function fetchImageUrls() {
            const promises = data.map(async (data) => {

                const response = await axios.get(`http://127.0.0.1:8000/api/machine_image${data.image}/`, { responseType: 'blob' });
                return URL.createObjectURL(response.data);
            });
            const urls = await Promise.all(promises);
            setImageData(urls)
        }
        if (data.length > 0) {
            fetchImageUrls();
        }
    }, [data]);

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

    const cards = imageData.map((imageUrl, index) => {
        const land = data[index];
        return (

            <div className='col-md-6 mb-4' key={index}>
                <div className="card  w-100 h-100 m-3 mb-0  shadow-lg ">
                    <div className='p-3 pb-0 mx-auto'>
                        <img src={imageUrl} alt="Card cap" style={{ height: "200px", width: "200px" }} />
                    </div>

                    <div className="card-body">

                        <div className='row'>
                            <div className='col-md-6'>
                                <p className="card-text ps-4"><span className='fs-5'>Machine:</span> {land.machine_name}</p>
                            </div>
                            <div className='col-md-6'>
                                <p className="card-text"><span className='fs-5'>Owner:</span> {land.owner_name}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <p className="card-text ps-4"><span className='fs-5'>Mobile: </span> {land.mobile}</p>
                            </div>
                            <div className='col-md-6'>
                                <p className="card-text "><span className='fs-5'>Address: </span> {land.owner_address}</p>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <p className="card-text ps-4"><span className='fs-5'>Date: </span> {convertToLocalDate(land.date)}</p>
                            </div>
                            <div className='col-md-6'>
                                <p className="card-text "><span className='fs-5'>Rent(Hour): </span> {land.rent}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer  text-center bg-white text-light">
                        <button type="button" onClick={(e) => openModal(land.id)} className="btn btn-primary w-50"><GrAdd /> Request</button>
                    </div>
                </div>
            </div>
        )
    })




    return (<>

        <div className='row p-2'>
            {cards}
            {/* hello */}
        </div>

        {/* Modal Form */}
        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title mx-auto " id="exampleModalLabel">Request Land</h5>
                    </div>
                    <div className="modal-body">
                        <RequestMachine/>
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

