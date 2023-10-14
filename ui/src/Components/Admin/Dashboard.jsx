import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IoMdNotificationsOutline } from "react-icons/io";
import { addMachine } from '../../Redux/slice/cartSlice';

import { BiPlusCircle } from "react-icons/bi";

// import AddMachine from "./AddMachine";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut, Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [dataCount, setDataCount] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/machine_pending/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setDataCount(data.length))
            .catch(error => console.error('Error fetching product:', error));
    }, [dataCount]);

    const AddMachine = async () => {
        dispatch(addMachine("NewMachine"))
    };

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

    return (
        <div className='w-100'>
            <div className='card shadow p-3 m-5 mb-3'>
                <h6 className='ps-3'>Admin Data</h6>
                <div className='d-flex fw-bold'>

                    <div className='card shadow p-4 m-2 w-50 text-center'>
                        <h6>Machine Requests</h6>
                        <h6 className='text-danger'><IoMdNotificationsOutline />{dataCount}</h6>
                    </div>

                    <div className='card shadow p-4 m-2 w-50 text-center'>
                        <h6>Add Machine</h6>
                        <Link type="button" onClick={(e) => AddMachine()}><BiPlusCircle /></Link>
                    </div>

                </div>
            </div >

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
    )
}
