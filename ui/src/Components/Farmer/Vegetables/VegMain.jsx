import React from 'react';
import VegetablesDetails from './VegetablesDetails';
import VegetablesRequests from './VegetablesRequests';
export default function VegMain() {
    return (<>
        <div className="p-3">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#home">My Vegetables</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">Vegetables Requests</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane active"><br/>
                        <VegetablesDetails/>
                    </div>
                    <div id="menu1" className="tab-pane fade"><br/>
                       <VegetablesRequests/>
                    </div>
                </div>
        </div>
        </>
    )
}

