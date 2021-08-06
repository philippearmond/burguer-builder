import React from 'react'

import './BuildControl.css'

const BurguerControl = ({ label, addedIngredient, removedIngredient, disabledBtn }) => {
    return (
        <div className="BuildControl">
            <div className="Label"> { label } </div>
            <button className="Less" onClick={ removedIngredient } disabled={ disabledBtn }>Less</button>
            <button className="More" onClick={ addedIngredient }>More</button>
        </div>
    )
}

export default BurguerControl