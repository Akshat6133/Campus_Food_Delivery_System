import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card_shop(props) {
  return (
    <div className="container d-flex rounded">
      <div className="card mt-3 coloring" style={{ width: '350px', maxHeight: '320px', borderRadius: '10px', overflow: 'hidden' }}>
        <Link to={`/shop/${props.shop_id}`} className="text-decoration-none text-dark">
          <img src={props.ImgSrc} className="card-img-top" alt="Shop" style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold text-black">{props.shopName}</h5>
            <p className="card-text text-success">{props.description}</p>
            <hr />
          </div>
        </Link>
      </div>
    </div>
  );
}
