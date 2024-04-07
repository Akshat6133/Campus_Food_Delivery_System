import React from 'react';
import { useCart, useDispatchCart } from '../../components/User/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  console.log(data);

  if (data.length === 0) {
    console.log("nothing");
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let orderedItems = [];

      data.forEach((food) => {
        const { name, qty, size, price } = food;
        orderedItems.push({ name, qty, size, price });
      });


      let response = await fetch("https://bhilaieats-1.onrender.com/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: orderedItems,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      console.log("JSON RESPONSE:::::", response.status)

      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >ShopName</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.shopname}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Remove</button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}> CheckOut</button>
        </div>
      </div>
    </div>
  )
}
