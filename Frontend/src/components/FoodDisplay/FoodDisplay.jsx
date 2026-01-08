import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  
  return (
    <div className='food-display' id='food-dispaly'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {/* Added ?. to prevent "reading properties of undefined" error */}
            {food_list?.map((item,index)=>{
              if (category==="All" || category===item.category) {
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }
              // It is good practice to return null if the condition isn't met
              return null;
            })}
        </div>
    </div>
  )
}

export default FoodDisplay