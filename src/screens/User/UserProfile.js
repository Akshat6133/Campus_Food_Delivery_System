import React, { useState, useEffect } from 'react';
import userIcon from '../../Assests/images/user.png';
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showOrders, setShowOrders] = useState(true);
  const [allOrderItems, setAllOrderItems] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');

        const response = await fetch('https://bhilaieats-1.onrender.com/api/getUserProfile', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
            'Email': `${email}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserProfile(data.userProfile);
        setAllOrderItems(data.orders);

      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  console.log(allOrderItems);

  return (
    <div className="page-background">
      <div className="user-profile-container">
        <div className="user-info">
          <div className="user-photo">
            <img src={userIcon} alt="User" />
          </div>
          <div className="user-details">
            {userProfile && (
              <>
                <h2 className="user-name">Name: {userProfile.name}</h2>
                <p className="user-email">Email: {userProfile.email}</p>
                <p className="user-phone">Phone: {userProfile.phone}</p>
              </>
            )}
          </div>
        </div>
        <hr className="divider" />
        <div className="user-options">
          <div className="dropdown">
            <button className="dropdown-btn">My Orders</button>
            {showOrders && (
              <div>
                {allOrderItems.length > 0 ? (
                  <div>
                    {allOrderItems.map((order, orderIndex) => (
                      <div key={orderIndex}>
                        <h3>Order {orderIndex + 1}</h3>
                        {console.log('order:', order)}
                        {Array.isArray(order.order_data) && order.order_data.length > 0 ? (
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order_data.map((orderItem, orderItemIndex) => (
                                orderItem.map((item, itemIndex) => (
                                  <tr key={itemIndex}>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
                                  </tr>
                                ))
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>No items found for this order.</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No order items found.</p>
                )}
              </div>
            )}
          </div>
          {/* Add more dropdown sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

