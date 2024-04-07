import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbarr.css';

export default function Card_shop(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Determine the destination link based on the login status
  const destinationLink = localStorage.getItem('authToken')
    ? `/shop/${props.shop_id}`
    : '/login';

  return (
    <Link
      to={destinationLink}
      className="text-decoration-none text-dark"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div data-testid='card-test'
        className="card mt-3 coloring"
        style={{
          width: '20rem',
          maxWidth: '90%', // Ensure card doesn't exceed parent's width
          borderRadius: '10px',
          overflow: 'hidden',
          margin: '10px',
          padding: '10px',
          boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <img src={props.ImgSrc} className="card-img-top" alt="Shop" style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title font-weight-bold text-black">{props.shopName}</h5>
          <p className="card-text text-success">{props.description}</p>
          <hr />
        </div>
      </div>
    </Link>
  );
}