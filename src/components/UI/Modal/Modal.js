import React, { Component } from 'react'

import './Modal.css'
import WrapAux from '../../../Hoc/WrapAux/WrapAux'
import Backdrop from '../Backdrop/Backdrop'
//o backdrop serve apenas para escurecer a tela atras do dialog e fechar o dialog ao clicar nele

//sera passado a condicional para classe inline para exemplificar outra forma de passar(gera o efeito de abertura do modal e esconde quando nao chamado)
class modal extends Component {

    //explicação do pq em burguerbuilder
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate() {
        console.log('updated')
    }

    render() {
        return (
            <WrapAux>
                <Backdrop show={ this.props.show } clicked={ this.props.modalClosed }/>
                <div className="Modal" style={{ transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1' : '0'}}>
                    { this.props.children }
                </div>
            </WrapAux>
        )
    }
}

export default modal