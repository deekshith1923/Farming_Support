import { useState } from "react";

import { HomeRounded, Menu } from "@mui/icons-material";
import { LuVegan } from "react-icons/lu";
import { BiLandscape } from "react-icons/bi";

import CustDashboard from "./CustDashboard";
import LandMain from "../Lands/LandMain";
import VegMain from "../Vegetables/VegMain";
import Navbar from "../../Navbar";
import "../../../css/Home.css";

export default function CustomerHome() {

    const [activePage, setActivePage] = useState("dashboard");
    const [isOpen, setIsopen] = useState(true);
    const [bcolor, setbgColor] = useState(1)

    const toggleSidebar = () => {
        setIsopen(!isOpen)
    }

    const handlePageClick = (page) => {
        setActivePage(page);
    }

    return (
        <>
            <Navbar />
            <div className="d-flex mt-5">
                <div className={`${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

                    <div className="handle" onClick={toggleSidebar}>
                        <Menu style={{ fontSize: "30px" }} />
                    </div>

                    <ul className="ul-list">
                        <li onClick={() => { handlePageClick('dashboard'); setbgColor(1) }}
                            className="list-item">
                            <HomeRounded className={`${isOpen ? (bcolor === 1 ? 'symbol-active' : 'symbol-open') : (bcolor === 1 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Dashboard</span>
                        </li>

                        <li onClick={() =>{handlePageClick('landdetails');setbgColor(2)}} className="list-item">
                            <BiLandscape className={`${isOpen ? (bcolor === 2 ? 'symbol-active' : 'symbol-open') : (bcolor === 2 ? 'symbol-active' : 'symbol-closed')}`}
                                style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Lands</span>
                        </li>

                        <li onClick={() => {handlePageClick('vegetables');setbgColor(3)}} className="list-item">
                            <LuVegan className={`${isOpen ? (bcolor === 3 ? 'symbol-active' : 'symbol-open') : (bcolor === 3 ? 'symbol-active' : 'symbol-closed')}`} style={{ fontSize: "35px" }} />
                            <span className={`${isOpen ? 'item-open' : 'item-closed'}`}>Vegetables</span>
                        </li>
                    </ul>

                </div>

                <div className={`${isOpen ? 'main-open' : 'main-closed'}`}>
                    {activePage === "dashboard" && <CustDashboard />}
                    {activePage === "landdetails" && <LandMain />}
                    {activePage === "vegetables" && <VegMain />}
                </div>

            </div>
        </>
    )
}

