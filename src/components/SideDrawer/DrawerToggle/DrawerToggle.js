import React from 'react'

import './DrawerToggle.css'

const DrawerToggle = ({ clicked }) => (
    <div className="DrawerToggle" onClick={ clicked }>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle