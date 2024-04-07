import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';

export default function Canteen() {
    const [formData, setFormData] = useState({
        shopname: "",
        owner_name: "",
        owner_email: "",
        owner_contact: "",
        image: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://bhilaieats-1.onrender.com/api/shopData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json();

        if (!json.success) {
            alert("Failed to add item");
        } else {
            alert("Item added successfully!");
        }

        console.log("Form Data:", formData);
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='login-container' style={{ backgroundColor: "#dfd2d2" }}>
            <Navbar />
            <div className='container'>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card" style={{ width: "790px", maxHeight: "620px" }}>
                            <div className="card-body" style={{ width: "790px", height: "500px" }}>
                                <h2 className="text-center mb-1">Add Restaurants</h2>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3 mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="categoryname" className="form-label">Shop Name</label>
                                            <input type="text" className="form-control" name='shopname' value={formData.shopname} onChange={onChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name" className="form-label"> Name of the Owner </label>
                                            <input type="text" className="form-control" name='owner_name' value={formData.owner_name} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="image" className="form-label">Email Address </label>
                                            <input type="text" className="form-control" name='owner_email' value={formData.owner_email} onChange={onChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="image" className="form-label">Phone Number </label>
                                            <input type="text" className="form-control" name='owner_contact' value={formData.owner_contact} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="image" className="form-label"> Image URL </label>
                                            <input type="text" className="form-control" name='image' value={formData.image} onChange={onChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="image" className="form-label"> Description </label>
                                            <textarea className="form-control" name='description' value={formData.description} onChange={onChange} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
