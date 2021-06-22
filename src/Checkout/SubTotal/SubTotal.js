import React from 'react'

import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider'
import { getTotalPrice } from '../../store/Reducer/Reducer'
import { useHistory } from 'react-router-dom'
import './Subtotal.css'

function SubTotal() {

  const history = useHistory()
  
  const [{basket}, dispatch] = useStateValue()

  const val = getTotalPrice(basket)

    return (
        <div className="subtotal">
             <CurrencyFormat 
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotalPrice(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button className={ val === 0 ? "btn__disabled" : "btn__enabled"} onClick={ e => history.push('/payment') }>Proceed to Checkout</button>
        </div>
    )
}

export default SubTotal
