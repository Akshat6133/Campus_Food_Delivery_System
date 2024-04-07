import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card_owners from '../../components/Shop_Owner/Card_owners';
import Footer from '../../components/User/Footer';
import Navbar from '../../components/Shop_Owner/Navbar_owner';

function DynamicOwner() {
  const { owner_id } = useParams();

  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemcat, setFoodItemcat] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://bhilaieats-1.onrender.com/api/owner/${owner_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch food items');
      }

      const data = await response.json();

      setFoodItems(data[0]);
      setFoodItemcat(data[1]);
    } catch (error) {
      console.error('Error fetching owner data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, [owner_id]);

  const handleRemoveItem = async (cardId) => {
    try {
      console.log(cardId);
      const response = await fetch(`https://bhilaieats-1.onrender.com/api/cards/${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFoodItems();
      } else {
        console.log("Failed to remove Card");
      }
    } catch (error) {
      console.error('Error removing card:', error);
    }
  }

  return (
    <div className="full-width-background">
      <Navbar />
      <div className='container'>
        {foodItemcat && foodItemcat.length !== 0 ? (
          foodItemcat.map((category) => (
            <div key={category._id} className='row mb-3'>
              <div className="fs-3 m-3">{category.categoryname}</div>
              <hr />
              {foodItems && foodItems.length !== 0 ? (
                foodItems.filter((item) => item.categoryname === category.categoryname && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItem) => (
                  <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card_owners cardId = {filterItem._id} foodName={filterItem.name} ImgSrc={filterItem.image} options={filterItem.options} handleRemoveItem={handleRemoveItem}/>
                  </div>
                ))
              ) : (
                <div className='text-black'>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <div> Category length is getting 0</div>
        )}
      </div>
      <Link to={`/owner/${owner_id}/add_item`}>
        <div className="add-button" title="Add an Item">
          +
        </div>
      </Link>
      <Footer />
    </div>
  );
}

export default DynamicOwner;
