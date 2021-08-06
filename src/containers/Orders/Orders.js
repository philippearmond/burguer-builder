import axios from '../../axios-orders'
import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(resp => {
                const fetchedOrders = []

                for(let key in resp.data) { //utilizado somente para agregar o id do firebase a cada objeto
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    })
                }
                console.log(fetchedOrders)
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                { this.state.orders.map(order => <Order ingredients={ order.ingredients } price={ +order.price } key={ order.id } />) }
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)