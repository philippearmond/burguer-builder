import React, { Component } from 'react'
import { Route } from 'react-router'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() { //tive que utilizar will invez de did pq state ingredients é null e la embaixo passo ele pra um componente, isso ja é renderizado antes do didmount executar
        const query = new URLSearchParams(this.props.location.search) //nativo do JS
        const ingredients = {}
        let price = 0

        for(let param of query.entries()) {
            if(param[0] === 'price') price = param[1]
            else ingredients[param[0]] = +param[1] // + para transformar em numero
        }

        this.setState({ ingredients: ingredients, price: price })
    }

    handleCancelCheckout = () => {
        this.props.history.goBack()
    }

    handleContinueCheckout = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredientsSelected={this.state.ingredients} onCancel={ this.handleCancelCheckout } onContinue={ this.handleContinueCheckout } />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={ this.state.ingredients } price={ this.state.price } {...props} /> }/> {/**OBS: Passo todas as props de checkout para contactData ao fazer isso!! Props é passado dessa forma pois preciso acessar o history do router, poderia usar o HOC withRouter tb! */}
            </div>
        )
    }
}

export default Checkout