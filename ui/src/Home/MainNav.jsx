import { Link } from "react-router-dom";
export default function MainNav() {

    return (
        <nav className="navbar navbar-expand-lg p-2 fixed-top" style={{backgroundImage: "linear-gradient(#00B4DB,#0083B0)"}}>
            {/* style={{ backgroundColor: "#007FFF" }} */}
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/">
                    <span className="fw-bold text-warning h4">F</span>arming<span className="fw-bold h4 text-warning">S</span>upport
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li>
                            <Link className="nav-link me-3 text-light" to="/contactus">Contact us</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link text-light" to="/login">Sign in</Link>
                        </li>
                        <li>
                            <Link className="btn border shadow-none text-light" to="/register">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}




