import React, { useState } from 'react';
import MainNav from "./MainNav";
import "../css/Home.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Contactus() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://127.0.0.1:8000/api/contactus/", data);
    if (response.status === 200) {
      window.location.reload();
      setData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
      });
      toast.success('Added Successfully!', {
        position: toast.POSITION.TOP_CENTER
      });

    } else {
      toast.error(response.data.errors + '?', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <>
      <MainNav />
      <ToastContainer />
      <div className='mt-5'>
        <div className='contact'>
          <div className='text-light p-5 fs-1 w-100 h-100'>
            <p className='p-5 display-4'>Farming Support</p>
          </div>
        </div>
      </div>

      <div className='container-fluid p-5'>
        <div className='row'>
          <div className='col-md-6 ms-5'>
            <div className='card p-5 shadow border rounded-2' style={{ marginTop: "-103px" }}>
              <form onSubmit={handleSubmit}>

                <div className='row mb-3'>
                  <div className='col-md-6'>
                    <label className='form-label' htmlFor='First Name'>First Name<span className='text-danger'>*</span></label>
                    <input type="text" className='form-control form-control-sm rounded-1' required
                      onChange={(e) => setData({ ...data, first_name: e.target.value })} />
                  </div>
                  <div className='col-md-6'>
                    <label className='form-label' htmlFor='Last Name'>Last Name<span className='text-danger'>*</span></label>
                    <input type="text" className='form-control form-control-sm rounded-1' required
                      onChange={(e) => setData({ ...data, last_name: e.target.value })} />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-md-6'>
                    <label className='form-label' htmlFor='Mobile'>Mobile<span className='text-danger'>*</span></label>
                    <input type="tel" className='form-control form-control-sm rounded-1' required
                      onChange={(e) => setData({ ...data, phone: e.target.value })} />
                  </div>
                  <div className='col-md-6'>
                    <label className='form-label' htmlFor='Email'>Email<span className='text-danger'>*</span></label>
                    <input type="email" className='form-control form-control-sm rounded-1' required
                      onChange={(e) => setData({ ...data, email: e.target.value })} />
                  </div>
                </div>


                <div className='row mb-3'>
                  <div className='col-md-12'>
                    <label className='form-label' htmlFor='Message'>Message<span className='text-danger'>*</span></label>
                    <textarea type="text" className='form-control form-control-sm rounded-1' required
                      onChange={(e) => setData({ ...data, message: e.target.value })} ></textarea>
                  </div>
                </div>

                <div>
                  <button className='btn text-light' type='submit' style={{ backgroundColor: "purple" }}>Submit</button>
                </div>

              </form>
            </div>
          </div>

          <div className='col-md-4 ms-5'>
            <div className='ms-5'>
              <h5>Contact Details</h5>
              <p>8736179915<br />
                deekshith1991@gmail.com</p>
              <h5 className='pt-3'>Address</h5>
              <div>
                Hotelsara,Ullur(P),<br />
                Sagara(T),<br />
                Shivamogga(D)<br />
                Karnataka 577412
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contactus