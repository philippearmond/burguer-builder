import React from 'react'

import NavigationItem from '../NavigationItem/NavigationItem'
import './NavigationItens.css'

//Ao definir active como propriedade em um componente, automaticamente o react interpreta como um boolean true(ex: com a tag a)
const NavigationItens = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact > BurguerBuilder </NavigationItem> {/**Exact somente aqui pois é um prefixo, lembre-se */}
        <NavigationItem link="/orders" > Orders </NavigationItem>
    </ul>
)

export default NavigationItens