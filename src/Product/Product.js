
import React from 'react';
import { useStateValue } from '../StateProvider'

import './Product.css';
import * as actions from '../store/action/Checkout'

function Product(props) {

   const [ { basket }, dispatch] = useStateValue({})

        console.log("basket entity", basket)

  const addToBasket = (  ) => {
        dispatch(actions.addToBasket(props))
  }


    return (
        <div className="product">
            <p  className="product__info">
                {props.title}
            </p>
            <p>
                <small>$</small>
                <strong>{props.price}</strong>
            </p>
            <div className="product__rating">
                {Array(props.rating).fill()
                 .map((_, i) => (
                    <p key={i}>🌟</p>
                 ))}
                
            </div>

            <img className="product__image" src={props.image} alt={props.alt} />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
 )
}

   <div>
</div>

export default Product
