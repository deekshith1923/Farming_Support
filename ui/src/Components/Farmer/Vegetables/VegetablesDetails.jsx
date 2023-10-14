import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlEnergy } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineDescription } from "react-icons/md";

export default function VegetablesDetails() {
    const [vegetablesdetails, setVegetablesDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedRows, setCheckedRows] = useState([]);
    const [datacount, setDataCount] = useState(0)
    const [postsPerPage, setPostperPage] = useState(7);

    useEffect(() => {
        const farmer_id = localStorage.getItem('id');
        fetch(`http://127.0.0.1:8000/api/vegetables_details/${farmer_id}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { setVegetablesDetails(data); setDataCount(data.length) })
            .catch(error => console.warn(error));
    }, []);

    const handleDelete = async () => {
        try {
            if (checkedRows.length > 0) {
                const result = window.confirm("Are You Sure..?")
                if (result === true) {
                    const farmer_id = localStorage.getItem('id');
                    const response = await fetch(`http://127.0.0.1:8000/api/delete_vegetables_details?farmer_id=${farmer_id}`, {
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
                toast.error('Select At least One Rows', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            console.error('Error deleting rows:', error);
        }
    };

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

    // Checkbox
    const handleCheckChange = (rid) => {
        if (checkedRows.includes(rid)) { setCheckedRows(checkedRows.filter(id => id !== rid)) }
        else { setCheckedRows([...checkedRows, rid]) }
    }

    const handleCheckAll = () => {
        if (checkedRows.length === vegetablesdetails.length) { setCheckedRows([]) }
        else { setCheckedRows(vegetablesdetails.map(item => item.id)) }
    }

    const checkAllRows = checkedRows.length === vegetablesdetails.length;


    const showData = () => {
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentLandDetails = vegetablesdetails.slice(indexOfFirstPage, indexOfLastPage);

        try {
            return currentLandDetails.map((item, index) => (
                <tbody key={index}>
                    <tr style={{ lineHeight: "40px" }}>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}><input type='checkbox' checked={checkedRows.includes(item.id)}
                            onChange={() => handleCheckChange(item.id)} className='form-check-input form-check-input-lg mt-3' /></td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}} ><Link to={`/handlevegetables/${item.id}`} className='text-decoration-none text-danger'><MdOutlineDescription /></Link></td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.farmer_name}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.address}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.mobile}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.vegetable_name}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.quantity}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.cost}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{convertToLocalDate(item.date)}</td>
                        <td style={checkedRows.includes(item.id) ? { backgroundColor: "aliceblue" } : {}}>{item.rent}</td>
                    </tr>
                </tbody>
            ));
        } catch (e) {
            alert(e.message);
        }
    };

    const showPagination = () => {
        const pageNumbers = [];
        const totalLandDetails = vegetablesdetails.length;

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
            {vegetablesdetails.length > 0 ? (
                <div className='card text-decoration-none w-100 mx-auto m-5 ps-3 pe-3 rounded-1 shadow-lg'>
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
                        <div className='p-3 text-center text-light fs-5 fw-bold'>Vegetables Details&nbsp;<SlEnergy className='text-danger' />{datacount}</div>
                        <div><button onClick={() => handleDelete()} className='btn shadow-none border-0 text-light mt-2 me-3 fs-5' style={{ backgroundColor: "orange" }}><RiDeleteBin5Line /></button></div>
                    </div>

                    

                    <div className='table-container rounded-3  p-3'>
                        <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                                <tr >
                                    <th><input type='checkbox' checked={checkAllRows} onChange={handleCheckAll}
                                        className='form-check-input form-check-input-lg' /></th>
                                    <th className='text-primary'>Vegetables Details</th>
                                    <th className='text-primary'>Farmer Name</th>
                                    <th className='text-primary'>Farmer Address</th>
                                    <th className='text-primary' >Mobile</th>
                                    <th className='text-primary'>Vegetables Name</th>
                                    <th className='text-primary'>Quantity /Kg</th>
                                    <th className='text-primary'>Cost /Kg</th>
                                    <th className='text-primary'>Added Date</th>
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

