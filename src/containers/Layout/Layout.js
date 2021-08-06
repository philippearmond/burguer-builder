import React, { Component } from 'react'

import WrapAux from '../../Hoc/WrapAux/WrapAux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/SideDrawer/SideDrawer'
import './Layout.css'
//O componente layout poderia ser alocado tb em high order components invez de containers

//Poderia usar React.Fragment invez do HOC(High Order Component)
//Passei constructor e chamei state e handle com this pq nao tenho o loader/plugin necessario para interpretação de tal!
//IMPORTANTE!!! Layout foi transformado em stateful componente pq preciso alterar esse state através de outro componente!!!
class Layout extends Component {
    constructor(props) {   //so passei props aqui de forma didatica por conta do children mas não é necessario, caso tenha so ele de props sendo utilizado
        super(props)

        this.state = {
            showSideDrawer: false
        }

        this.sideDrawerCloseHandler = () => {
            this.setState({ showSideDrawer: false })
        }

        this.sideDrawerToggleHandler = () => {
            this.setState(prevState => {
                return { showSideDrawer: !prevState.showSideDrawer }
            })
        }
    }

    render() {
        return(
            <WrapAux>
                <SideDrawer open={ this.state.showSideDrawer } closed={ this.sideDrawerCloseHandler }/>
                <Toolbar drawerToggleClicked={ this.sideDrawerToggleHandler }/>
                <main className="Content">
                    { this.props.children }
                </main>
            </WrapAux>
        )
    }
}

export default Layout