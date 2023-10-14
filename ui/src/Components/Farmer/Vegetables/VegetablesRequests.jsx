import React, { useState, useEffect } from 'react';
import { SlEnergy } from "react-icons/sl";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { MdOutlineDescription } from "react-icons/md";

export default function VegetablesRequests() {
    const [vegetablesrequests, setVegetablesRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [datacount, setDataCount] = useState(0);
    const [status, setStatus] = useState("All Requests")
    const [postsPerPage, setPostperPage] = useState(5);

    useEffect(() => {
        setStatus(status);
        fetch(`http://127.0.0.1:8000/api/vegetables_status/${status}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { setVegetablesRequests(data); setDataCount(data.length) })
            .catch(error => console.warn(error));
    }, [status]);

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

    const handleSelectChange = (e) => {
        setStatus(e.target.value)
    }

    const showData = () => {
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentLandDetails = vegetablesrequests.slice(indexOfFirstPage, indexOfLastPage);
        try {
            return currentLandDetails.map((item, index) => (
                <tbody key={index}>
                    <tr style={{ lineHeight: "40px" }}>
                        <td>{postsPerPage * (currentPage - 1) + index + 1}</td>
                        <td ><Link to={`/handlevegetablesrequests/${item.vegetables_id}/${item.id}`} className='text-decoration-none text-danger'><MdOutlineDescription /></Link></td>
                        <td >{item.requester_name}</td>
                        <td >{item.address}</td>
                        <td >{item.mobile}</td>
                        <td >{convertToLocalDate(item.request_date)}</td>
                        <td >{item.status}</td>
                    </tr>
                </tbody>
            ));
        } catch (e) {
            alert(e.message);
        }
    };

    const showPagination = () => {
        const pageNumbers = [];
        const totalLandDetails = vegetablesrequests.length;

        for (let i = 1; i <= Math.ceil(totalLandDetails / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        const pagination = (number) => {
            setCurrentPage(number);
        };

        let displayPages = pageNumbers;

        if (pageNumbers.length > 4) {
            if (currentPage <= 2) {
                displayPages = [...pageNumbers.slice(0, 2), '...', pageNumbers.slice(-2)];
            } else if (currentPage >= pageNumbers.length - 1) {
                displayPages = [pageNumbers.slice(0, 2), '...', ...pageNumbers.slice(-2)];
            } else {
                displayPages = [
                    pageNumbers.slice(0, 1),
                    '...',
                    pageNumbers[currentPage - 1],
                    pageNumbers[currentPage],
                    pageNumbers[currentPage + 1],
                    '...',
                    pageNumbers.slice(-1),
                ];
            }
        }

        return (
            <nav>
                <ul className="pagination shadow-0">
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button onClick={() => pagination(currentPage - 1)} className="page-link">
                                Previous
                            </button>
                        </li>
                    )}
                    {displayPages.map((number, index) => (
                        <li
                            key={index}
                            className={currentPage === number ? 'page-item active' : 'page-item'}
                        >
                            {number === '...' ? (
                                <span className="page-link">...</span>
                            ) : (
                                <button onClick={() => pagination(number)} className="page-link">
                                    {number}
                                </button>
                            )}
                        </li>
                    ))}
                    {currentPage < pageNumbers.length && (
                        <li className="page-item">
                            <button onClick={() => pagination(currentPage + 1)} className="page-link">
                                Next
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };

    return (
        <div>
            <div className='card  text-decoration-none w-100 mx-auto m-5 ps-3 pe-3 rounded-1 shadow-lg'>
                <div className=' d-flex justify-content-between rounded-1 border' style={{ marginTop: '-30px', backgroundColor: "orange" }}>
                    <div className='me-3 mt-2 '>
                        <button class="btn border-0 shadow-none dropdown-toggle w-100 fw-bold fs-5" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='fs-6 fw-light'>page&nbsp;</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" onClick={(e) => setPostperPage(5)}>05 &nbsp;rows</button></li>
                            <li><button class="dropdown-item" onClick={(e) => setPostperPage(10)}>10 &nbsp;rows</button></li>
                            <li><button class="dropdown-item" onClick={(e) => setPostperPage(15)} >15 &nbsp;rows</button></li>
                            <li><button class="dropdown-item" onClick={(e) => setPostperPage(20)}>20 &nbsp;rows</button></li>
                        </ul>
                    </div>
                    <div className='p-3  text-light fs-5 fw-bold'>Vegetables Requests&nbsp;<SlEnergy className='text-dark' />{datacount}</div>
                    <div className='me-3 mt-3 '>
                        <Form.Select size="sm" className="mt-1 form-control border-0 border-bottom rounded-0 shadow-none rounded-2" required
                            value={status} onChange={handleSelectChange}>
                            <option value='All Requests'>All Requests</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </div>
                </div>

                {vegetablesrequests.length > 0 ? (
                    <div className='table-container rounded-3  p-3'>
                        <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                                <tr>
                                    <th className='text-primary'>Sl.No</th>
                                    <th className='text-primary'>Vegetables Details</th>
                                    <th className='text-primary'>Requester Name</th>
                                    <th className='text-primary'>Requester Address</th>
                                    <th className='text-primary'>Mobile</th>
                                    <th className='text-primary'>Requested Date</th>
                                    <th className='text-primary'>Status</th>
                                </tr>
                            </thead>
                            {showData()}
                        </table>
                        <div style={{ float: 'right' }} className='mt-3'>{showPagination()}</div>
                    </div>) :
                    (<div className='p-5 m-4 fw-bold text-danger text-center fs-4 mt-3 mx-auto w-50'>No Data Available....</div>)
                }

            </div>

        </div>

    );
}

