import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        {/* NavLink automatically adds an 'active' class when the URL matches 'to' */}
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          {/* Note: Ensure you are using the correct icon for List if you have one, 
              otherwise order_icon is fine as a placeholder */}
          <img src={assets.order_icon} alt="List" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar