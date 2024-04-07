import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../../Model';
import { useCart } from './ContextReducer';
import './Navbarr.css';
import userIcon from '../../Assests/images/user.png';

import Cart from '../../screens/User/cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('shopname');
    navigate("/user");
  };

  return (
    <div data-testid='Navbar-test'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img src="https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg?w=740&t=st=1706353061~exp=1706353661~hmac=49b276b5e98074b203d820eeafbb4e2ac9002b7506621881acc9ac5ae6202c0c" alt="." className="navbar-logo" />
            <Link className="navbar-brand fs-2 fst-italic mx-3" to="/">
              BhilaiEats
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {localStorage.getItem('authToken') ? (
                <div className="d-flex align-items-center">
                  <li className="nav-item">
                    <div className="btn bg-white text-danger mb-1" onClick={handleLogout}>
                      Logout
                    </div>
                  </li>
                  <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>
                    My Cart
                    <Badge pill bg="danger"> {data.length} </Badge>
                  </div>
                  <li className='nav-item'>
                    <a className="mx-2" href="/userProfile" title='Profile'> {/* Use <a> tag instead of <Link> */}
                      <img src={userIcon} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    </a>
                  </li>
                </div>
              ) : null}
            </ul>
            <div className="d-flex align-items-center">
              {!localStorage.getItem('authToken') ? (
                <div className="ml-auto">
                  <Link className="btn bg-white text-success mx-2" style={{ borderRadius: "10px" }} to="/signup">
                    Sign Up
                  </Link>
                  <Link className="btn bg-white text-success mx-2 " style={{ borderRadius: "10px" }} to="/login">
                    Login
                  </Link>
                </div>
              ) : null}
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
