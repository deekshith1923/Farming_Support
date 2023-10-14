import React from 'react';
import AvailableVegetables from './AvailableVegetables';
import VegReqStatus from './VegReqStatus';

export default function VegMain() {
    return (<>
        <div className="p-3">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#home">Available Vegetables</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">My Requests</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane active"><br/>
                        <AvailableVegetables/>
                    </div>
                    <div id="menu1" className="tab-pane fade"><br/>
                       <VegReqStatus/>
                    </div>
                </div>
        </div>
        </>
    )
}

