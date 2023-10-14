import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut, Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CustDashboard() {
    const [ldataCount, setLDataCount] = useState(0)
    const [vdataCount, setVDataCount] = useState(0)

    useEffect(() => {
        const cust_id = localStorage.getItem('id');
        fetch(`http://127.0.0.1:8000/api/land_approved/${cust_id}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setLDataCount(data.length))
            .catch(error => console.error('Error fetching product:', error));
    }, [ldataCount]);

    useEffect(() => {
        const cust_id = localStorage.getItem('id');
        fetch(`http://127.0.0.1:8000/api/vegetables_approved/${cust_id}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setVDataCount(data.length))
            .catch(error => console.error('Error fetching product:', error));
    }, [vdataCount]);

    


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
                <h6 className='ps-3'>Customer Data</h6>
                <div className='d-flex fw-bold'>
                <div className='card  p-4 m-2 w-50 text-center rounded-2 bg-light shadow'>
                        <h6 className="fs-5">Land Approved</h6>
                        <h6 className='text-danger'>{ldataCount}</h6>
                    </div>

                    <div className='card  p-4 m-2 w-50 text-center rounded-2 bg-light shadow'>
                        <h6 className="fs-5">Vegetables Aproved</h6>
                        <h6 className='text-danger'>{vdataCount}</h6>
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
