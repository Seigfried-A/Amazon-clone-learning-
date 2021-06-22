import moment from 'moment';
import React from 'react';
import CheckoutProduct from '../../Checkout/CheckoutProduct/CheckoutProduct';
import './Order.css';

function Order({order}) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map((item, i) => (
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
    )
}

export default Order
