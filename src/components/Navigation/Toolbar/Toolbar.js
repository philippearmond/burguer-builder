import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItens from '../NavigationItens/NavigationItens'
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle'
import './Toolbar.css'

const Toolbar = ({ drawerToggleClicked }) => (
    <header className="Toolbar">
        <DrawerToggle clicked={ drawerToggleClicked }/>
        <Logo height="80%"/>
        <nav className="DesktopOnly">
            <NavigationItens />
        </nav>
    </header>
)

export default Toolbar