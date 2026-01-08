import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({setShowLogin}) => {

    const[menu,setMenu]=useState("Home");
    const {getTotalCartAmount ,token,setToken} = useContext(StoreContext);
    
    const logout =()=>{
        localStorage.removeItem("token")
        setToken("");
        navigate("/")
    }
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        // First navigate to home page
        navigate('/');
        // Wait a bit for navigation to complete, then scroll
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    
  return (
    <div className='navbar'>
        <img src={assets.logo}  alt="" className='logo' onClick={()=>navigate('/')} style={{cursor: 'pointer'}} />
        <ul className="navbar-menu">
            <li onClick={()=>{setMenu("Home"); scrollToSection('header');}} className={menu==="Home"?"active":""}>Home</li>
            <li onClick={()=>{setMenu("Menu"); scrollToSection('explore-menu');}} className={menu==="Menu"?"active":""}>Menu</li>
            <li onClick={()=>{setMenu("Mobile-app"); scrollToSection('app-download');}} className={menu==="Mobile-app"?"active":""}>Mobile-app</li>
            <li onClick={()=>{setMenu("Contact us"); scrollToSection('footer');}} className={menu==="Contact us"?"active":""}>Contact us</li>
        </ul>
        <div className="navbar-right">
            
            <div className="navbar-search-icon" onClick={()=>navigate('/cart')}>
                <img src="/basket_icon.png" alt="" />
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                 <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                 <hr />
                 <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
           </div>}

        </div>
    </div>
  )
}

export default Navbar
