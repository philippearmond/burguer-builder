import React from 'react'

import Burguer from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'

import './CheckoutSummary.css'

const CheckoutSummary = ({ ingredientsSelected, onCancel, onContinue }) => {
    return (
        <div className="CheckoutSummary">
            <h1>
                We hope it tastes well!!
            </h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burguer ingredient={ ingredientsSelected } />
            </div>
            <Button btnType="Danger" clicked={ onCancel }>CANCEL</Button>
            <Button btnType="Success" clicked={ onContinue }>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary