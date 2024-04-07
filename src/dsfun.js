// import React, { useEffect, useState ,useRef} from 'react'
// import Card from '../components/card'
// import Carousel from '../components/carousel'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'

// // In Home page, we will be displaying Card, Carousel, Footer, Navbar

// export default function Home() {

//   const [search,setSearch] = useState('');                                        // State variables for search input, food categories, and food items
//   const [foodCat, setFoodCat] = useState([])      
//   const [foodItem, setFoodItems] = useState([])

//   const loadData = async () => {                                                  // Sending a POST request to fetch data from server.
//     try {
//       const response = await fetch("https://bhilaieats-1.onrender.com/api/foodData", {
//         method: 'GET',                                                           // HTTP req, is being made using POST method. -> used to submit data to server, for creating or updating resources on server.
//         headers: {
//           'Content-Type': 'application/json'                                      // To specify content is of type json format.
//         }
//       });
//       const data = await response.json();                                         // This parses json encoded response body and stores it in data.
      
//       setFoodItems(data[0]);                                                      // Set food items and categories based on fetched data
//       setFoodCat(data[1]);
//     } 
    
//     catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {                                                               // When components mounts for 1st time, run this effect, only once.
//     loadData()
//   }, [])

//   return (
//     <div >

//       <div> <Navbar /> </div>                                                     {/* Navbar at the top */}
//       <div> <Carousel/> </div>                                                    {/* Carousel at the middle */}

//       <div className='container'>     
//       {
//         (foodCat.length !== 0) ?
//           foodCat.map((data) => {
//             return (
//               <div className='row mb-3'>                                                                                          {/* This className of row-mb-3 and col-12, col-md-6 and these all are taken from bootstrap grid system */}
//                 <div key={data._id} className="fs-3 m-3">
//                   {data.CategoryName}
//                 </div>                                                                                                            {/* Displays the category name of the food on each card */}
                                                                                                                                
//                 <hr />
//                 {foodItem.length !== 0
//                   ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
//                     .map(filterItem => {
//                       return (
//                         <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
//                           <Card foodName={filterItem.name} foodItem = {filterItem} ImgSrc={filterItem.img}
//                               options = {filterItem.options[0]}
//                           />
//                         </div>
//                       )
//                     })
//                   : <div>"No such data found"</div>
//                 }
//               </div>
//             )
//           })
//           : <div>" U have done something wrong "</div>
//         }
//       </div>

//       <div> <Footer /> </div>                                                     {/* Footer at the End */}     

//     </div>
//   )
// }