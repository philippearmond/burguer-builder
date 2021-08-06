import React, { Component } from 'react'

import WrapAux from '../WrapAux/WrapAux'
import Modal from '../../components/UI/Modal/Modal'
//OBS MTOOOO IMPORTANTE!!! No primeiro momento este componente foi criado com essas configs do axios dentro de um componentDidMount, mas ele encapsula outro componente, que se fizer uma requisição get,
//dentro de seu componentDidMount, ele nunca sera executado pq o componentDidMount so é executado dps de renderizar os componentes filhos sendo assim meus interceptadores
//nao sao executados quando deveriam ser(antes do componentDidMount do filho/wrappedComponent)
//foi passado para dentro do constructor, ja q é executado antes de criar o componente(melhor explicação na aula 184)


//Utilizado quando eu precisar enviar uma msg de erro por falha de alguma requisição do axios, GLOBALMENTE, basta encapsular o componente como no burguerBuilder export
const wrapErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() { //sempre que for usar estado no componente, sem os plugins do proprio react, preciso passar a constructor e o super, chamar as funçoes dentro da constructor e aplicar this a elas
            super()
            
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req //sempre obrigado a retornar algo, repare abaixo tb
            })

            this.resInterceptors = axios.interceptors.response.use(resp => resp, err => {
                this.setState({ error: err })
            })
        
            this.state = {
                error: null
            }

            //explicação extremamente importante do pq usar, final do TXT do axios
            this.componentWillUnmount = () => {
                axios.interceptors.request.eject(this.reqInterceptors)
                axios.interceptors.response.eject(this.resInterceptors)
            }

            this.errorConfirmedHandler = () => { //ao clicar no backdrop
                this.setState({ error: null })
            }
        }

        //se eu nao colocar a condição da linha 37 o codigo quebra pois, message sera null antes de fazer a requisição
        render() {
            return (
                <WrapAux>
                    <Modal show={ this.state.error } modalClosed={ this.errorConfirmedHandler }>
                    { this.state.error ? this.state.error.message : null }
                </Modal>
                    <WrappedComponent {...this.props}/>
                </WrapAux>
            )
        }
    }
}

export default wrapErrorHandler