import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TbLogout } from "react-icons/tb";
import "../css/Home.css";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem('Name');
  const email = localStorage.getItem('Email');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg p-2 fixed-top" style={{ backgroundImage: "linear-gradient(#00B4DB,#0083B0)" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="#">
          <span className="fw-bold text-warning h4">F</span>arming<span className="fw-bold h4 text-warning">S</span>upport
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <Dropdown drop="down-centered" >
                <Dropdown.Toggle style={{ backgroundImage: "linear-gradient(#00B4DB,#0083B0)" }} className="border-0"><AccountCircleIcon className="me-3" /><span className="me-2">{email}</span></Dropdown.Toggle>
                <Dropdown.Menu className='rounded-3 border-1 shadow-lg'>
                  <Dropdown.Item className="text-center pb-0"><AccountCircleIcon className="fs-1 text-primary" /></Dropdown.Item>
                  <Dropdown.Item className="pb-0">{name}</Dropdown.Item>
                  <Dropdown.Item className="pb-0">{email}</Dropdown.Item>
                  <hr className="dropdown-divider" />
                  <Dropdown.Item className="text-end fw-bold text-danger p-0 pe-1" onClick={() => handleLogout()}><span className="rounded-2">Logout<TbLogout className="ms-2 fs-5" /></span></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}




