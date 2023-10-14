import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home/Home"
import Login from "./Home/Login";
import Register from "./Home/Register";
import Contactus from "./Home/Contactus";
import FarmerHome from "./Components/Farmer/Home/FarmerHome";
import CustomerHome from "./Components/Customers/Home/CustomerHome";
import AdminHome from "./Components/Admin/AdminHome";
import AddMachine from "./Components/Admin/AddMachine";
import SingleLand from "./Components/Customers/Lands/SingleLand";
import SingleVegetables from "./Components/Customers/Vegetables/SingleVegetables";
import SingleMachine from "./Components/Admin/SingleMachine";
import RequestedLandInfo from "./Components/Customers/Lands/RequestedLandInfo";
import RequestedVegetablesInfo from "./Components/Customers/Vegetables/RequestedVegetablesInfo";
import RequestedMachinesInfo from "./Components/Farmer/Machines/RequestedMachinesInfo";
import HandleLand from "./Components/Farmer/Lands/HandleLand";
import HandleVegetables from "./Components/Farmer/Vegetables/HandleVegetables";
import HandleLandRequest from "./Components/Farmer/Lands/HandleLandRequest";
import HandleVegRequest from "./Components/Farmer/Vegetables/HandleVegRequest";
import HandleMachineRequest from "./Components/Admin/HandleMachineRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/farmerhome' element={<FarmerHome />} />
        <Route path='/custhome' element={<CustomerHome />} />
        <Route path='/adhome' element={<AdminHome />} />
        <Route path='/machine' element={<AddMachine />} />
        <Route path='/landdetails/:land_id' element={<SingleLand />} />
        <Route path='/vegetablesdetails/:veg_id' element={<SingleVegetables />} />
        <Route path='/machinedetails/:machine_id' element={<SingleMachine />} />
        <Route path='/handleland/:land_id' element={<HandleLand />} />
        <Route path='/handlelandrequests/:land_id/:cust_id' element={<HandleLandRequest />} />
        <Route path='/handlevegetables/:vegetables_id' element={<HandleVegetables />} />
        <Route path='/handlevegetablesrequests/:veg_id/:cust_id' element={<HandleVegRequest />} />
        <Route path='/handlemachinerequests/:machine_id/:farmer_id' element={<HandleMachineRequest />} />
        <Route path='/landstatus/:land_id' element={<RequestedLandInfo />} />
        <Route path='/vegetablesstatus/:veg_id' element={<RequestedVegetablesInfo />} />
        <Route path='/machinestatus/:machine_id' element={<RequestedMachinesInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
