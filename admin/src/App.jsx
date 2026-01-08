import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar.jsx' 
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add/add'      
import List from './pages/list/list'   
import Orders from './pages/orders/order' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  // Change: Explicitly set the localhost URL for your backend
  // This ensures 'url' is never undefined when passed to your pages.
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'> 
        <Sidebar/>
        <Routes>
          {/* Now 'url' will correctly pass "http://localhost:4000" to these components */}
          <Route path="/" element={<List url={url}/>} /> 
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          
          {/* Optional: Add a default route so it doesn't show "No routes matched" on home page */}
          <Route path="/" element={<List url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App