import React from 'react'
import { useStateValue } from '../StateProvider'

import './Checkout.css'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import SubTotal from './SubTotal/SubTotal'



function Checkout() {
    const [{ basket, user}, dispatch] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img    
                    className="checkout__ad" 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                    alt="" />
        
                <div>
                    <h5>Hello, {user?.email} </h5>
                    <h2 className="checkout__title"><i>Your Shopping Basket</i></h2>
                
                   
                    {basket.map((item, i) => (
                       
                        <CheckoutProduct 
                            key={i}
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            image={item.image}
                            price={item.price}
                        />
                        
                    ))}
                   

                </div>
            </div>
            <div className="checkout__right">
                <SubTotal/>
            </div>
        </div>
    )
}

export default Checkout
