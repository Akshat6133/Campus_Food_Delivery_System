import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card_shop from '../../components/User/card_shop';
import Carousel from '../../components/User/carousel';
import Footer from '../../components/User/Footer';
import Navbar from '../../components/User/Navbar';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('https://bhilaieats-1.onrender.com/api/shopData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setShops(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
  };

  return (
    <div className="coloring">
      <Navbar />
      <Carousel onSearchChange={handleSearchChange} />
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold mt-6 mb-6 dark-font-color">Restaurants</h2>
            <hr className="my-2 dark-font-color" />

          </div>
        </div>
        {shops && shops.length !== 0 ? (
          <div className="row">
            {shops
              .filter((item) => item.shopname.toLowerCase().includes(search.toLowerCase()))
              .map((filterItem) => (
                <div key={filterItem._id} className="col-12 col-md-6 col-lg-4 mt-3">
                  <Card_shop
                    shopName={filterItem.shopname}
                    shop_id={filterItem._id}
                    ImgSrc={filterItem.image}
                    description={filterItem.description}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div>"Backend is not connected, with frontend"</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
