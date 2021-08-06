import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from '../../containers/Layout/Layout'
import BurguerBuilder from '../../containers/BurguerBuilder/BurguerBuilder'
import Checkout from '../../containers/Checkout/Checkout'
import Orders from '../../containers/Orders/Orders'

//Nesse projeto o Layout poderia ocupar o lugar de App porem, foi feito dessa forma para demonstrar como renderizar
//outro layout a partir de determinada condição
const App = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={ BurguerBuilder } /> {/**Se eu nao definir exact aqui, o checkout nao vai ser renderizado, o burguer builder ficaria por cima */}
            <Route path="/checkout" component={ Checkout } />
            <Route path="/orders" component={ Orders } />
        </Switch>
    </Layout>
)

export default App