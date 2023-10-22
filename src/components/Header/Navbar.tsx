import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
const NavbarHeader = () => {
  const { accessToken, logout, isAuthenticated } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const disableSignIn: any = () => {
    setIsDisabled(false)
  }

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }
  const goToProfile = () => {
    navigate('/profile')
  }

  return (
    <div className='nav-height'>
      <header>
        <div className='header-image'>
          <img src={require("../../assets/images/Logo.png")} />
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light nav-bg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">HOME</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/docs">DOCUMENTATION</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">API EXPLORER</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">PRODUCTS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">CONTACT US</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nationaladdress">NATIONAL ADDRESS</Link>
              </li>
            </ul>
            {!isAuthenticated() && !accessToken ? <button className="signin-button" onClick={disableSignIn}>
              <Link className="nav-link" to="/login">SIGN IN</Link>
            </button> :
              <div>
                <div className="dropdown">
                  <button className="username dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Name
                  </button>
                  <ul className="dropdown-menu dropdown-position">
                    <li><a className="dropdown-item dropdown-btn" style={{ color: "black" }} onClick={goToProfile}>Profile</a></li>
                    <li><a className="dropdown-item dropdown-btn" style={{ color: "black" }} onClick={handleSignOut}>Sign out</a></li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarHeader;