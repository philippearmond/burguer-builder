import React from 'react'
import PropTypes from 'prop-types'

import BuildControl from "./BuildControl/BuildControl"
import './BuildControls.css'

const BuildControls = ({ onAddIngredient, onRemoveIngredient, disabledBtn, totalPrice, purchaseable, ordered }) => {

    const controlsRender = [ //utlizado para renderizar multiplos botoes via JS e a label de cada um (lembre do mock na controller do angularJS)
        { label: 'Salad', type: 'salad' },
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' }
    ]

    return (
        <div className="BuildControls">
            <p>Current Price: <strong>${ totalPrice.toFixed(2) }</strong></p>
            { controlsRender.map( ctrl => <BuildControl label={ ctrl.label } key={ctrl.label} addedIngredient={ onAddIngredient.bind(null, ctrl.type) } removedIngredient={ () => onRemoveIngredient(ctrl.type) } disabledBtn={ disabledBtn[ctrl.type] } /> ) /*As duas Formas de passar parametro*/}
            <button className="OrderButton" disabled={ !purchaseable } onClick={ ordered }>ORDER NOW</button>
        </div>
    )
}

BuildControls.propTypes = {
    onAddIngredient: PropTypes.func.isRequired,
    onRemoveIngredient: PropTypes.func.isRequired,
    disabledBtn: PropTypes.object.isRequired,
    totalPrice: PropTypes.number.isRequired,
    purchaseable: PropTypes.bool.isRequired,
    ordered: PropTypes.func.isRequired
}

export default BuildControls