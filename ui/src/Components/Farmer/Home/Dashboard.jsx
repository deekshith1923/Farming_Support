import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLand, addVegetables, } from '../../../Redux/slice/cartSlice';
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiPlusCircle } from "react-icons/bi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [landDataCount, setLandDataCount] = useState(0)
    const [vegDataCount, setVegDataCount] = useState(0)
    const dispatch = useDispatch();

    const AddLand = async () => {
        dispatch(addLand("addLand"))
    };

    const AddVegetables = async () => {
        dispatch(addVegetables("addVegetable"))
    }

    const BarData = [
        { assetId: 1, rate: 200 },
        { assetId: 2, rate: 100 },
        { assetId: 3, rate: 450 },
        { assetId: 4, rate: 250 },
    ]

    const charData1 = {
        label: BarData.map(item => item.assetId),
        datasets: [
            {
                labrl: "Rate",
                data: BarData.map(item => item.rate),
                backgroundColor: ['lightgreeen', 'lightblue', 'gray', 'orange'],
                borderidth: 1,
                hoverOffset: 4,
                Legend: {
                    display: true,
                    position: "bottom",
                },
            },
        ]
    }

    const options = {
        Plugin: {
            Tooltip: {
                titleFont: {
                    size: 10
                },
                bodyFont: {
                    size: 10
                },
            },

            legend: {
                display: true,
                responsive: true,
                position: "bottom",
                labels: {
                    boxWidth: 30,
                    padding: 10,
                    font: {
                        size: 10
                    },
                },
                align: "center",
            },
        }
    }
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/land_pending/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setLandDataCount(data.length))
            .catch(error => console.error('Error fetching product:', error));
    }, [landDataCount]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vegetables_pending/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setVegDataCount(data.length))
            .catch(error => console.error('Error fetching product:', error));
    }, [vegDataCount]);



    return (<>
        <div className='w-100 mt-5'>
            <div className='card shadow p-3 m-5 mb-3'>
                <h6 className='ps-3'>Famer Data</h6>
                <div className='d-flex fw-bold'>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Land Requests</h6>
                        <h6 className='text-danger'><IoMdNotificationsOutline />{landDataCount}</h6>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Vegetables Requests</h6>
                        <h6 className='text-danger'><IoMdNotificationsOutline />{vegDataCount}</h6>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Add Land</h6>
                        <Link type="button" onClick={(e) => AddLand()}><BiPlusCircle /></Link>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Add Vegetables</h6>
                        <Link type="button" onClick={(e) => AddVegetables()}><BiPlusCircle /></Link>
                    </div>

                </div>
            </div >

            {/* <div className=' m-5 mb-3'>
                <div className='d-flex fw-bold'>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Land Requests</h6>
                        <h6 className='text-danger'><IoMdNotificationsOutline />{landDataCount}</h6>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Vegetables Requests</h6>
                        <h6 className='text-danger'><IoMdNotificationsOutline />{vegDataCount}</h6>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Add Land</h6>
                        <Link type="button" onClick={(e) => AddLand()}><BiPlusCircle /></Link>
                    </div>

                    <div className='card shadow p-4 m-1 w-25 text-center'>
                        <h6>Add Vegetables</h6>
                        <Link type="button" onClick={(e) => AddVegetables()}><BiPlusCircle /></Link>
                    </div>

                </div>
            </div > */}

            <div className='m-5 mt-4'>
                <div className='d-flex w-100'>
                    <div className='card p-3 me-2 w-100 shadow'>
                        <div className='d-flex h-100 justify-content-center' style={{ maxHeight: "200px" }}>
                            <Doughnut data={charData1} options={options} height={75} width={100} />
                        </div>
                    </div>
                    <div className='card p-3 ms-2 w-100 shadow'>
                        <div className='d-flex h-100 justify-content-center' style={{ maxHeight: "200px" }}>
                            <Pie data={charData1} options={options} style={{ width: "200px" }} />
                        </div>
                    </div>
                </div>
            </div>

        </div >



    </>

    )
}

export default Dashboard