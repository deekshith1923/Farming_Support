import React, { useState, useEffect } from 'react';
import { SlEnergy } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineDescription } from "react-icons/md";

export default function VegReqStatus() {
    const [vegetablesrequests, setVegetablesRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedRows, setCheckedRows] = useState([]);
    const [datacount, setDataCount] = useState(0);
    const [postsPerPage, setPostperPage] = useState(5);

    useEffect(() => {
        const customer_id = localStorage.getItem('id');
        fetch(`http://127.0.0.1:8000/api/requested_vegetables_status/${customer_id}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { setVegetablesRequests(data); setDataCount(data.length) })
            .catch(error => console.warn(error));
    }, []);


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

    const handleDelete = async () => {
        try {
            if (checkedRows.length > 0) {
                const result = window.confirm("Are You Sure..?")
                if (result === true) {
                    const response = await fetch('http://127.0.0.1:8000/api/delete_vegetables_requested/', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ checkedRows }),
                    });
                    if (response.ok) {
                        toast.success('Data Deleted Successfully', {
                            position: toast.POSITION.TOP_CENTER
                        });
                        window.location.reload()
                        setCheckedRows([]);
                    } else {
                        console.error('Error deleting rows:', response.statusText);
                    }
                }
            }
            else {
                toast.error('Select At least One', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            console.error('Error deleting rows:', error);
        }
    };


    // Checkbox
    const handleCheckChange = (rid) => {
        if (checkedRows.includes(rid)) { setCheckedRows(checkedRows.filter(id => id !== rid)) }
        else { setCheckedRows([...checkedRows, rid]) }
    }
    const handleCheckAll = () => {
        if (checkedRows.length === vegetablesrequests.length) { setCheckedRows([]) }
        else { setCheckedRows(vegetablesrequests.map(item => item.id)) }
    }
    const checkAllRows = checkedRows.length === vegetablesrequests.length;

    const showData = () => {
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentLandDetails = vegetablesrequests.slice(indexOfFirstPage, indexOfLastPage);
        try {
            return currentLandDetails.map((item, index) => (
                <tbody key={index}>
                    <tr style={{ lineHeight: "40px" }}>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}><input type='checkbox' checked={checkedRows.includes(item.id)}
                            onChange={() => handleCheckChange(item.id)} className='form-check-input form-check-input-lg mt-3' /></td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}><Link to={`/vegetablesstatus/${item.id}`} className='text-decoration-none text-danger'><MdOutlineDescription /></Link></td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{convertToLocalDate(item.request_date)}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}
                            className={`${item.status === "Pending" ? 'text-primary fw-bold' : (item.status === "Approved" ? "text-success fw-bold" : ("text-danger fw-bold"))}`}>{item.status}</td>
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
            <ToastContainer />
            {vegetablesrequests.length > 0 ? (
                <div className='card  text-decoration-none w-100 mx-auto m-5 ps-3 pe-3 rounded-1 shadow-lg'>
                
                    <div className='d-flex justify-content-between w-100 mx-auto rounded-1 border' style={{ marginTop: '-30px', backgroundColor: "orange" }}>
                        <div className='me-3 mt-2 '>
                            <button class="btn btn-light btn-sm ms-3 mt-2 border-0 shadow-none dropdown-toggle w-100 fw-bold fs-5" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='fs-6 fw-light'>page&nbsp;</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" onClick={(e) => setPostperPage(5)}>05 &nbsp;rows</button></li>
                                <li><button class="dropdown-item" onClick={(e) => setPostperPage(10)}>10 &nbsp;rows</button></li>
                                <li><button class="dropdown-item" onClick={(e) => setPostperPage(15)} >15 &nbsp;rows</button></li>
                                <li><button class="dropdown-item" onClick={(e) => setPostperPage(20)}>20 &nbsp;rows</button></li>
                            </ul>
                        </div>
                        <div className='p-3 text-center text-light fs-5 fw-bold'>Vegetables Requests&nbsp;<SlEnergy className='text-danger' />{datacount}</div>
                        <div><button onClick={() => handleDelete()} className='btn shadow-none border-0 text-light mt-2 me-3 fs-5' style={{ backgroundColor: "orange" }}><RiDeleteBin5Line /></button></div>
                    </div>


                    <div className='table-container rounded-3  p-3'>
                        <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                                <tr>
                                    <th><input type='checkbox' checked={checkAllRows} onChange={handleCheckAll}
                                        className='form-check-input form-check-input-lg' /></th>
                                    <th className='text-primary'>Request Details</th>
                                    <th className='text-primary'>Requested Date</th>
                                    <th className='text-primary'>Status</th>
                                </tr>
                            </thead>
                            {showData()}
                        </table>
                        <div style={{ float: 'right' }} className='mt-3'>{showPagination()}</div>
                    </div>
                </div>
            ) :
                (<div className='card p-5 shadow-lg bg-warning fw-bold text-light text-center fs-4 mt-3 mx-auto w-50'>No Data Available....</div>)
            }

        </div>

    );
}

