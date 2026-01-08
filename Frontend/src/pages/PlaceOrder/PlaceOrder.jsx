import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } 
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getTotalCartAmount() === 0) {
      alert('Your cart is empty!');
      navigate('/cart');
      return;
    }

    if (validateForm()) {
      
      // 1. Structure the Order Items
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })

      // 2. Structure the Data Payload
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      }

      // 3. API Call based on Payment Method
      try {
        if (paymentMethod === "card") {
            // --- STRIPE PAYMENT FLOW ---
            let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}});
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing order: " + response.data.message);
            }
        } 
        else {
 
            let response = await axios.post(url + "/api/order/placecod", orderData, {headers:{token}});
            if (response.data.success) {
                navigate("/myorders"); // Redirect directly to orders page
                alert("Order placed successfully!");
            } else {
                alert("Error placing order: " + response.data.message);
            }
        }

      } catch (error) {
        console.error(error);
        alert("Something went wrong during the API call.");
      }

    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token])

  const getTotalItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

  return (
    <form onSubmit={handleSubmit} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <div className="input-group">
            <input type="text" name="firstName" placeholder='First name' value={formData.firstName} onChange={handleInputChange} className={errors.firstName ? 'error' : ''} />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <div className="input-group">
            <input type="text" name="lastName" placeholder='Last name' value={formData.lastName} onChange={handleInputChange} className={errors.lastName ? 'error' : ''} />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>
        <div className="input-group">
          <input type="email" name="email" placeholder='Email address' value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="input-group">
          <input type="text" name="street" placeholder='Street address' value={formData.street} onChange={handleInputChange} className={errors.street ? 'error' : ''} />
          {errors.street && <span className="error-message">{errors.street}</span>}
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleInputChange} className={errors.city ? 'error' : ''} />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <div className="input-group">
            <input type="text" name="state" placeholder='State' value={formData.state} onChange={handleInputChange} className={errors.state ? 'error' : ''} />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <input type="text" name="zipCode" placeholder='Zip code' value={formData.zipCode} onChange={handleInputChange} className={errors.zipCode ? 'error' : ''} />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
          <div className="input-group">
            <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleInputChange} className={errors.country ? 'error' : ''} />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>
        <div className="input-group">
          <input type="tel" name="phone" placeholder='Phone number' value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'error' : ''} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <div className="input-group">
          <textarea name="deliveryInstructions" placeholder='Delivery instructions (optional)' rows="3" value={deliveryInstructions} onChange={(e) => setDeliveryInstructions(e.target.value)} />
        </div>

        <div className="payment-method">
          <p className='subtitle'>Payment Method</p>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <span>Credit/Debit Card (Stripe)</span>
            </label>
            
            <label className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <span>Cash on Delivery</span>
            </label>
            
            {/* REMOVED DIGITAL WALLET OPTION */}
          </div>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div className="order-items">
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Qty: {cartItems[item._id]}</p>
                    </div>
                    <p className="item-price">${item.price * cartItems[item._id]}</p>
                  </div>
                );
              }
            })}
          </div>

          <div className="cart-total-summary">
            <div className="cart-total-details">
              <p>Subtotal ({getTotalItems()} items)</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tax (5%)</p>
              <p>${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() * 0.05).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details total">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2 + getTotalCartAmount() * 0.05).toFixed(2)}</b>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
             {paymentMethod === "cash" ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
          </button>
          
          <button type="button" className="back-to-cart-btn" onClick={() => navigate('/cart')}>Back to Cart</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder