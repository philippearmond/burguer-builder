import { elementType } from 'prop-types'
import React from 'react'

import './Input.css'

const Input = (props) => {
    let inputElement = null

    const inputClasses = ['InputELement']
    let invalidMessage = null

    if(props.invalid && props.hasTouched) {
        inputClasses.push('Invalid')
        invalidMessage = <p className="InvalidMessage">{ props.elementConfig.placeholder } was incorrect!</p>
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={ props.changed } /> //Repare q de forma automatica ele interpreta o type e o placeholder e os associa!!!!
            break;
        case 'select':
            inputElement = <select className={ inputClasses.join(' ') } value={ props.value } onChange={ props.changed }>
                                { props.elementConfig.options.map( option => <option key={ option.value } value={ option.value }> { option.display } </option>) }
                            </select>
            break;
        default:
            inputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={ props.changed }/>
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{ props.label }</label>
            { inputElement }
            { invalidMessage }
        </div>
    )
}

export default Input