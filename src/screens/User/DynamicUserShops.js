import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/User/card';
import Footer from '../../components/User/Footer';
import Navbar from '../../components/User/Navbar';

export default function DynamicUserShops() {
    const { shop_id } = useParams();

    const [search, setSearch] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [foodItemcat, setFoodItemcat] = useState([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch(`https://bhilaieats-1.onrender.com/api/shop/${shop_id}`);

                const data = await response.json();

                setFoodItems(data[0]);
                setFoodItemcat(data[1]);

            } catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };

        fetchFoodItems();

    }, [shop_id]);

    console.log(foodItems);

    return (
        <div className="full-width-background">
            <Navbar />
            <div className='container'>
                {foodItemcat && foodItemcat.length !== 0 ? (
                    foodItemcat.map((category) => (
                        <div key={category._id} className='row mb-3'>
                            <div className="fs-3 m-3">{category.categoryname}</div>
                            <hr />
                            {foodItems.length !== 0 ? (
                                foodItems.filter((item) => item.categoryname === category.categoryname && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItem) => (
                                    <div key={filterItem._id} className='col'>
                                        <Card foodName={filterItem.name} ImgSrc={filterItem.image} options={filterItem.options} />
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
            <Footer />
        </div>
    );
}







// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from "react-router-dom";
// import Card from '../../components/User/card';
// import Footer from '../../components/User/Footer';
// import Navbar from '../../components/User/Navbar';

// export default function Shop_Items() {

//     const { owner_id } = useParams();
//     const [search, setSearch] = useState('');
//     const [food_milkshakesCat, setFoodMilkshakesCat] = useState([]);
//     const [foodItem, setFoodItems] = useState([]);

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const response = await fetch("https://bhilaieats-1.onrender.com/api/owner/", {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 const data = await response.json();

//                 setFoodItems(data[0]);
//                 setFoodMilkshakesCat(data[1]);

//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         console.log(foodItem);

//         // const { foodItemId } = useParams();

//         loadData();
//     }, []);

//     return (
//         <div className="full-width-background"> {/* Add this wrapper div */}
//             <Navbar />
//             <div className='container'>
//                 <div className='row mb-5'>
//                     <div className='fs-3 mt-5'>About Shop</div>
//                     <hr />
//                     <div className='col-md-4'>
//                         <img src="https://media.istockphoto.com/id/818584076/photo/various-fruits-and-vegetables-juices.jpg?s=612x612&w=0&k=20&c=TJU3c1AznFv3vwNcu9DpEgT7Q1A6uWF5P50j8X9qSKM=" alt="Shop" className="shop-image" />
//                     </div>
//                     <div className='col-md-8'>
//                         <h3 className="shop-name font-weight-bold">IIT Bhilai Milkshakes</h3>
//                         <p className="shop-description">Quench your thirst with our refreshing milkshakes and fruit juices, crafted from the freshest ingredients for a burst of flavor in every sip</p>
//                     </div>
//                 </div>
//                 {food_milkshakesCat && food_milkshakesCat.length !== 0 ? (
//                     food_milkshakesCat.map((category) => (
//                         <div key={category._id} className='row mb-3'>
//                             <div className="fs-3 m-3">{category.categoryname}</div>
//                             <hr />
//                             {foodItem.length !== 0 ? (
//                                 foodItem.filter((item) => item.categoryname === category.categoryname && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItem) => (
//                                     <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
//                                         <Card foodName={filterItem.name} ImgSrc={filterItem.image} options={filterItem.options} />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className='text-black'>No such data found</div>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div>You have done something wrong</div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// }
