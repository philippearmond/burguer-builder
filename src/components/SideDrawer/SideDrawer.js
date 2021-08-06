import React from 'react'

import Backdrop from '../UI/Backdrop/Backdrop'
import Logo from '../Logo/Logo'
import NavigationItens from '../Navigation/NavigationItens/NavigationItens'
import WrapAux from '../../Hoc/WrapAux/WrapAux'
import './SideDrawer.css'

const sideDrawer = ({ open, closed }) => {

    const attachedClasses = open ? ['SideDrawer', 'Open'] : ['SideDrawer', 'Close']

    return (
        <WrapAux>
            <Backdrop show={ open } clicked={ closed }/>
            <div className={ attachedClasses.join(' ') }>
                <Logo height="11%" />
                <nav className="Spacing">
                    <NavigationItens />
                </nav>
            </div>
        </WrapAux>
    )
}

export default sideDrawer