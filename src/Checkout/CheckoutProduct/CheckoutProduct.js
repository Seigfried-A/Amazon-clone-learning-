import React from 'react'

import './CheckoutProduct.css'
import * as action from '../../store/action/Checkout'
import { useStateValue } from '../../StateProvider'

function CheckoutProduct(props) {
    const [{ basket },dispatch ] = useStateValue() 

    const removeFromBasket = () => {
        dispatch(action.removeFromBasket(props.id))
        console.log(props.id)
    }

    return (
        <div className="checkoutProduct">
           
            <img 
                    src={props.image} alt="" 
                    className="CheckoutProduct__image"/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">
                {props.title}
                </p>
            <p>
                <small>$</small>
                <strong>{props.price}</strong>
            </p>

                <div className="checkoutProduct__rating">
                    {Array(props.rating)
                    .fill()
                    .map((_,i) => <p key={i}>🌟</p>)}

                </div>
                <button onClick={removeFromBasket}> Remove from basket</button>


            </div>
            
           
        </div>
    )
}

export default CheckoutProduct
