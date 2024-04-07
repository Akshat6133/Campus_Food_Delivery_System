import React, { useState } from 'react';
import './Navbarr.css';

export default function Carousel({ onSearchChange }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

        <div className="carousel-inner" id='carousel'>

          <div className="carousel-caption" style={{ zIndex: "4", top: "55%", left: "05%", transform: "translateY(-50%)" }}>
            <div className='textcarousel' style={{ textAlign: "left", fontStyle: "Italic", fontSize: "40px" }}>
              <p>Food Delivery at IIT Bhilai</p>
            </div>
            <div className="d-flex justify-content-start align-items-center flex-row">
              <input
                className="form-control me-2 bg-white text-dark"
                style={{ width: "450px", height: "40px" }}
                type="search"
                placeholder="Search Restaurants..."
                aria-label="Search"
                value={search}
                onChange={handleSearch}
              />
              <button
                className="btn btn-orange"
                type="button"
              >
                Search
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img src="https://lyphe.com/app/uploads/2023/10/Image-1-cannabis-muffins.jpeg" className="d-block w-100" style={{ width: "500px", height: "660px", filter: "brightness(90%)" }} alt="Burger" />
          </div>
        </div>
      </div>
    </div>
  );
}



