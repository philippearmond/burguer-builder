import React from 'react'
import PropTypes from 'prop-types'   //previne a quebra do codigo/app se o props passado for formato incorreto

import './BurguerIngredient.css'

//No exemplo esse componente recebeu no inicio uma var q recebe null e a cada condição invez de return eu tinha novo valor atribuido a essa variavel
const BurguerIngredient = props => {
    switch(props.type) {
        case ('bread-bottom'):
            return <div className="BreadBottom"></div>
        case ('bread-top'):
            return (
                <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
            )

        case ('meat'):
            return <div className="Meat"></div>
        case ('cheese'):
            return <div className="Cheese"></div>
        case('bacon'):
            return <div className="Bacon"></div>
        case('salad'):
            return <div className="Salad"></div>
        default:
            return null
    }
}

BurguerIngredient.propTypes = {
    type: PropTypes.string.isRequired  //type é a props
}

export default BurguerIngredient