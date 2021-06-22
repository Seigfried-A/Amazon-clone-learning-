import React, { useState, useEffect} from 'react'
import { useStateValue } from '../StateProvider'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {getTotalPrice} from '../store/Reducer/Reducer'
import { useHistory } from 'react-router-dom';
import { db } from '../firebase'

import * as action from '../store/action/Checkout'
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import axios from '../axios'
import './Payment.css'


function Payment() {

    const [{basket, user}, dispatch] = useStateValue()
    
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState('')
    const [successful, setSuccessful] = useState(false)
    const [clientSecrets, setClientSecrets] = useState(true)

    useEffect(() => {

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getTotalPrice(basket) * 100 }`
            })
            setClientSecrets(response.data.clientSecrets)
        }
       getClientSecret();
    }, [basket])

    console.log('the secret is not a secret, here goes >>>', clientSecrets)

    const formSubmitHandler = async (event) => {
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecrets, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,

            })

            setSuccessful(true);
            setError(null)
            setProcessing(false)

            dispatch(action.emptyBasket())

            history.push('/orders')
    
        })
    }
  

    const formChangeHandler = event => {

        setDisabled(event.empty)
        setError(event.error ? event.error.message: "" );

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h5>Payment Page
                </h5>
         

        <div className="payment__section">
             <div className="payment__title">
                 <h3>Delivery Address</h3>
             </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>08024455567</p>
                    <p>24 Olorioko close, unity crescent London</p>
                    <p>p.o box</p>
                </div>
            </div>
        <div className="payment__section">
            <div className="payment__title">
                <h3>Review Your Items</h3>
            </div>
            <div className="payment__items">
                {basket.map((item, i)=> (
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
       <div className="payment__section">
           <div className="payment__title">
               <h3>Payment Method</h3>
           </div>
           <div className="payment__details">
                <form onSubmit={formSubmitHandler}>
                    <CardElement onChange={formChangeHandler}/>

                    <div className="payment__pricecontaine">
                        <CurrencyFormat
                            renderText={(value) => (
                            <h3>
                            Order Total: <strong>{value}</strong>
                            </h3>
                                )}
                                decimalScale={2}
                                value={getTotalPrice(basket)} // Part of the homework
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                                <button disabled={disabled || successful || processing }>
                                <span>{processing ? <p>Processing</p> : "buy now" }</span>
                                </button> 
                                
                    </div>
                    { error && <div>{error}</div> }
                </form>
           </div>
          
       </div>
    
        </div>
    </div>
       
    )
}

export default Payment
