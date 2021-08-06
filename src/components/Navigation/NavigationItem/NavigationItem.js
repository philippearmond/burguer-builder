import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationItem.css'

const NavigationItem = props => (
    <li className="NavigationItem">{/**Repare na forma diferente de passar o active nesse exemplo do burguer builder */}
        <NavLink activeClassName="active" to={ props.link } exact={ props.exact }>{ props.children }</NavLink> {/*Preciso acessar qual item é exact já que cada item é dinamico. Entao recebo props exact*/}
    </li>
)

export default NavigationItem