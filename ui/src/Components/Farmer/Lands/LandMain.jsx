import React from 'react';
import LandDetails from './LandDetails';
import LandRequests from './LandRequests';
export default  function LandMain() {
    return (<>
        <div className="p-3">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#home">My Lands</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">Land Requests</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane active"><br/>
                        <LandDetails/>
                    </div>
                    <div id="menu1" className="tab-pane fade"><br/>
                       <LandRequests/>
                    </div>
                </div>
        </div>
        </>
    )
}

