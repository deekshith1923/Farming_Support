import React from 'react';
import MachineAvailable from './MachineAvailable';
import MachineReqStatus from './MachineReqStatus';

export default function MachineMain() {
    return (
        <>
            <div className="p-3">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#home">Machines Available</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">My Requests</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane active"><br />
                        <MachineAvailable/>
                    </div>
                    <div id="menu1" className="tab-pane fade"><br />
                    <MachineReqStatus/>
                    </div>
                </div>
            </div>
        </>
    )
}

