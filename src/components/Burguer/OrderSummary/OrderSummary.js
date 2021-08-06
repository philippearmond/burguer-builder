import React from 'react'

import WrapAux from '../../../Hoc/WrapAux/WrapAux'
import Button from '../../UI/Button/Button'

//Nesse componente foi passado o css inline por ser um simples span com uma formatação apenas
//OBS: Nunca esqueça de definir uma key quando renderizo elementos JSX através do looping
const OrderSummary = ({ ingredients, purchaseContinued, purchaseCanceled, price }) => {

    const ingredientSummary = Object.keys(ingredients).map(ingKey => 
        <li key={ ingKey }>
            <span style={{ textTransform: 'capitalize' }}>{ ingKey }</span>: { ingredients[ingKey] }
        </li>
    )

    return (
        <WrapAux>
            <h3>Your Order</h3>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total Price: $ { price.toFixed(2) }</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={ purchaseCanceled }>CANCEL</Button>
            <Button btnType="Success" clicked={ purchaseContinued }>CONTINUE</Button>
        </WrapAux>
    )
}

export default OrderSummary