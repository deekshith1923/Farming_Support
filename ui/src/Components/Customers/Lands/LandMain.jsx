import React from 'react';
import AvailableLands from './AvailableLands';
import LandReqStatus from './LandReqStatus';

export default function LandMain() {
    return (<>
        <div className="p-3">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#home">Available Lands</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">My Requests</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane active"><br/>
                        <AvailableLands/>
                    </div>
                    <div id="menu1" className="tab-pane fade"><br/>
                       <LandReqStatus/>
                    </div>
                </div>
        </div>
        </>
    )
}

