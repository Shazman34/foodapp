import React, { useContext, useState, useEffect } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets' // Ensure you have this import for the parcel icon

const MyOrders = () => {

  // 1. Get URL and Token from Context
  const {url,token} = useContext(StoreContext);
  const [data,setData] = useState([]);

  const fetchOrders = async () => {
    // FIXED: The code in image_f5d19a.png was cut off. This includes the headers.
    const response = await axios.post(url+"/api/order/userorders", {}, {headers:{token}});
    setData(response.data.data);
    console.log(response.data.data); // Check your console for this log
  }

  // 2. Fetch data only if token exists
  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {/* 3. Map through the data */}
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              
              {/* 4. Display items with comma logic */}
              <p>{order.items.map((item,index)=>{
                if (index === order.items.length-1) {
                  return item.name+" x "+item.quantity
                }
                else{
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              
              {/* 5. Display Amount, Items count, Status */}
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders