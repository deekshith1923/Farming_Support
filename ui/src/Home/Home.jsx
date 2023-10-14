import React from 'react';
import Hnavbar from './MainNav';
import HomeBanner from "../Images/Home.jpg";

function Home() {
  return (
    <>
      <Hnavbar />
      <div className='mt-5 pt-2 h-100 w-100'>
        <div style={{
          backgroundImage: `url(${HomeBanner})`, height: "55vh", width: "100%", backgroundPosition: "center",
          backgroundRepeat: 'no-repeat', backgroundSize: "cover"
        }}>
          <div className='pt-5 ps-5'>
            <h5 className='pt-2 ps-5 display-3 fw-bold text-light' style={{ fontFamily: "Oswald"}}>Farming Support</h5>
          </div>
        </div>
      </div>
      <div className='p-5 pt-5'>
        <div style={{fontFamily:"serif"}} className='pt-3'>
          <h4 className='fw-bold' >Farming Support</h4>
        This Integrated Farming Support System offers farmers a comprehensive platform to lease agricultural land,market agricultural products,<br/>  and access rental machinery,
         thereby facilitating seamless transactions and support across various farming needs.
        </div>
      </div>
    </>
  )
}

export default Home