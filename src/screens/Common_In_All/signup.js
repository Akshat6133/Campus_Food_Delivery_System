import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common_In_All/Navbar_signup';
import './signup.css';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", contactNumber: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = "https://bhilaieats-1.onrender.com/api/CreateUser";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                contact: credentials.contactNumber,
            }),
        });

        const json = await response.json();

        if (!json.success) {
            alert("Failed to create user. Please check your input and try again.");
        } else {
            alert("User created successfully!");
            
            let apiUrl = "https://bhilaieats-1.onrender.com/api/loginUser";
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
          
              navigate("/user");
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className='login-container' style={{backgroundColor:"#dfd2d2"}}>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5" style={{ height: "700px" }}>
                    <div className="col-md-5">
                        <div className="card d-flex flex-row" style={{ width: "700px" }}>
                            <div className="login-image">
                                <img src="https://images.unsplash.com/photo-1586511934875-5c5411eebf79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGJvd2x8ZW58MHx8MHx8fDA%3D" alt="Signup" style={{ height: "600px", width: "320px" }} />
                            </div>
                            <div className="card-body" style={{ height: "600px", backgroundColor: "white" }}>
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" name='contactNumber' value={credentials.contactNumber} onChange={onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                    <p className="text-center mb-0">Already have an account? <Link to="../login">Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

