import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMachine } from '../../Redux/slice/cartSlice';

import { HomeRounded, Menu } from "@mui/icons-material";
import { FaTractor } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";

import Dashboard from "./Dashboard";
import MachineDetails from "./MachineDetails";
import MachinePending from "./MachinePending";
import AddMachine from "./AddMachine";
import Navbar from "../Navbar";
import "../../css/Home.css";

export default function AdminHome() {

    const [activePage, setActivePage] = useState("dashboard");
    const [isOpen, setIsopen] = useState(true);
    const [bcolor, setbgColor] = useState(1)
    const dispatch = useDispatch();
    const req = useSelector(state => state.Land)
    const Machine = req[req.length - 1];

    const toggleSidebar = () => {
        setIsopen(!isOpen)
    }

    const handlePageClick = (page) => {
        setActivePage(page);
    }

    useEffect(() => {
        if (Machine === "NewMachine") {
            setActivePage("addmachine");
            dispatch(addMachine("MachineAdded"))
        }
    }, [dispatch, Machine])

    return (
        <>
            <Navbar />
            <div className="d-flex mt-5">
                <div className={`${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

                    <div className="handle" onClick={toggleSidebar}>
                        <Menu style={{ fontSize: "30px" }} />
                    </div>

                    <ul className="ul-list">
                        <li onClick={() => { handlePageClick('dashboard'); setbgColor(1) }} className="list-item">
                            <HomeRounded className={`${isOpen ? (bcolor === 1 ? 'symbol-active' : 'symbol-open') : (bcolor === 1 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Dashboard</span>
                        </li>

                        <li onClick={() => { handlePageClick('machinedetails'); setbgColor(2) }} className="list-item">
                            <FaTractor className={`${isOpen ? (bcolor === 2 ? 'symbol-active' : 'symbol-open') : (bcolor === 2 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Machine Info</span>
                        </li>

                        <li onClick={() => { handlePageClick('machinepending'); setbgColor(3) }} className="list-item">
                            <IoGitPullRequestSharp className={`${isOpen ? (bcolor === 3 ? 'symbol-active' : 'symbol-open') : (bcolor === 3 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Requests</span>
                        </li>

                    </ul>

                </div>

                <div className={`${isOpen ? 'main-open' : 'main-closed'}`}>
                    {activePage === "dashboard" && <Dashboard />}
                    {activePage === "machinedetails" && <MachineDetails />}
                    {activePage === "machinepending" && <MachinePending />}
                    {activePage === "addmachine" && <AddMachine />}

                </div>

            </div>
        </>
    )
}

