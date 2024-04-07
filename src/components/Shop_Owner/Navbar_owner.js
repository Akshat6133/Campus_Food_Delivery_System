// Navbar for signup page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../../Model';
import { useCart } from '../../components/User/ContextReducer';
import '../User/Navbarr.css';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('shopname');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
                <div className="container-fluid">
                    <img src="https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg?w=740&t=st=1706353061~exp=1706353661~hmac=49b276b5e98074b203d820eeafbb4e2ac9002b7506621881acc9ac5ae6202c0c" alt="." className="navbar-logo" />
                    <Link className="navbar-brand fs-2 fst-italic mx-3" to="/">
                        BhilaiEats
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="ms-auto"> {/* Here's the change */}
                            <Link className="btn bg-white text-success mx-2" style={{ borderRadius: "10px" }} to="/">
                                Order Requests
                            </Link>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Link className="btn bg-white text-success mx-2" style={{ borderRadius: "10px" }} to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
