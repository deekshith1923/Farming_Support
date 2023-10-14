import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLand, addVegetables } from '../../../Redux/slice/cartSlice';

import { HomeRounded, Menu } from "@mui/icons-material";
import { BiLandscape } from "react-icons/bi";
import { FaTractor } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";

import Dashboard from "./Dashboard";
import MachineMain from "../Machines/MachineMain";
import VegMain from "../Vegetables/VegMain";
import LandMain from "../Lands/LandMain";
import AddLand from "../Lands/AddLand";
import AddVegetables from "../Vegetables/AddVegetables";
import "../../../css/Home.css";
import Navbar from "../../Navbar";

export default function FarmerHome() {

    const [activePage, setActivePage] = useState("dashboard");
    const [isOpen, setIsopen] = useState(true);
    const [bcolor, setbgColor] = useState(1);
    const dispatch = useDispatch();
    const req = useSelector(state => state.Land)
    const response = req[req.length - 1];

    const toggleSidebar = () => {
        setIsopen(!isOpen)
    }

    const handlePageClick = (page) => {
        setActivePage(page);
    }

    useEffect(() => {
        if (response === "addLand") {
            setActivePage("addland");
            dispatch(addLand("LandAdded"))
        }
        else if (response === "addVegetable") {
            setActivePage("addvegetables")
            dispatch(addVegetables("VegetablesAdded"))
        }
    }, [dispatch, response])

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

                        <li onClick={() => { handlePageClick('landmain'); setbgColor(2) }} className="list-item">
                            <BiLandscape className={`${isOpen ? (bcolor === 2 ? 'symbol-active' : 'symbol-open') : (bcolor === 2 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Lands</span>
                        </li>

                        <li onClick={() => { handlePageClick('vegmain'); setbgColor(3) }} className="list-item">
                            <LuVegan className={`${isOpen ? (bcolor === 3 ? 'symbol-active' : 'symbol-open') : (bcolor === 3 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Vegetables</span>
                        </li>

                        <li onClick={() => { handlePageClick('machinemain'); setbgColor(4) }} className="list-item">
                            <FaTractor className={`${isOpen ? (bcolor === 4 ? 'symbol-active' : 'symbol-open') : (bcolor === 4 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Machines</span>
                        </li>

                    </ul>

                </div>

                <div className={`${isOpen ? 'main-open' : 'main-closed'}`}>
                    {activePage === "dashboard" && <Dashboard />}
                    {activePage === "machinemain" && <MachineMain />}
                    {activePage === "vegmain" && <VegMain />}
                    {activePage === "landmain" && <LandMain />}
                    {activePage === "addland" && <AddLand />}
                    {activePage === "addvegetables" && <AddVegetables />}
                </div>

            </div>
        </>
    )
}

