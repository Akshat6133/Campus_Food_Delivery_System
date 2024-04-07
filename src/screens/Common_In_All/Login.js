import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common_In_All/Navbar_login';

import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "", userType: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = "";

    if (credentials.userType === "user") {
      apiUrl = "https://bhilaieats-1.onrender.com/api/loginUser";
    } else if (credentials.userType === "admin") {
      if (credentials.email === "sribhargavof03@gmail.com" || credentials.email === "mitulvardhan@iitbhilai.ac.in") {
        apiUrl = "https://bhilaieats-1.onrender.com/api/loginSuperAdmin";
        console.log("I'm a SuperAdmin");
      } else {
        apiUrl = "https://bhilaieats-1.onrender.com/api/loginAdmin";
        console.log("I'm an admin");
      }
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
      return; 
    }

    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("authToken", json.authToken);
    localStorage.setItem("shopname", json.shopname);

    //console.log(json.authToken);

    if (apiUrl === "https://bhilaieats-1.onrender.com/api/loginAdmin") {
      const ownersResponse = await fetch("https://bhilaieats-1.onrender.com/api/owners");
      const ownersData = await ownersResponse.json();

      for (const ownerArray of ownersData) {
        for (const owner of ownerArray) {
          if (owner.email === credentials.email) {
            console.log("Owner found:", owner);
            navigate(`/owner/${owner._id}`);
            return;
          }
        }
      }
    } else if (apiUrl === "https://bhilaieats-1.onrender.com/api/loginSuperAdmin") {
      navigate('/superadmin');
      return;
    }

    navigate("/user");
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='coloring'>
      <div className='login-container' style={{zIndex:-99}}>
        <Navbar/>
        <div className="container">
          <div className="row justify-content-center mt-5" style={{height: "510px"}}>
            <div className="col-md-5">
              <div className="card d-flex flex-row" style={{ width: "700px"}}>
                <div className="login-image">
                  <img src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2QlMjBib3dsfGVufDB8fDB8fHww" alt="Login" style={{ height: "510px", width: "320px" }} />
                </div>
                <div className="card-body" style={{height: "510px", backgroundColor:"white"}}>
                  <h2 className="text-center">Login</h2>
                  <hr className='mb-3' style={{ borderTop: '1px dotted black' }} />
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="userType" className="form-label">User Type</label>
                      <select className="form-control custom-select" name="userType" value={credentials.userType} onChange={onChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                    <p className="text-center mb-0">New User? <Link to="../signup">Sign Up</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
