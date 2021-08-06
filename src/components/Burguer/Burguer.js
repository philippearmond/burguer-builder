import React from 'react'

import './Burguer.css'
import BurguerIngredient from '../Burguer/BurguerIngredient/BurguerIngredient'

const Burguer = ({ ingredient }) => {
    let transformedIngredient = Object.keys(ingredient)
        .map(ingKey => {
            return [...Array(ingredient[ingKey])]
                .map(( _, index) => {
                    return <BurguerIngredient type={ ingKey } key={ ingKey + index } />
                })
        })
        .reduce(( arr, el ) => { //utilizado so para criar o empty message, sem ele so ha o array populado
            return arr.concat(el)
        }, [])


    if( transformedIngredient.length === 0 ) transformedIngredient = <p>Please start adding ingredients!</p>

    return(
        <div className="Burguer">
            <BurguerIngredient type="bread-top" />
            { transformedIngredient }
            <BurguerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burguer