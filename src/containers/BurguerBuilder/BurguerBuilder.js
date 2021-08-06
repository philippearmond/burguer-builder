import React, { Component } from 'react'

import WrapAux from '../../Hoc/WrapAux/WrapAux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';

//criado globalmente na app, sempre que crio variaveis globais devo gerar com essa notação!
//Geralmente crio global variables quando quero um valor disponivel em qualquer parte da app sem precisar
//ser chamado novamente, e claro, esse valor nao sera modificado hora alguma(o original)
//abaixo o valor add por cada ingrediente adicionado
const INGREDIENTS_PRICES = {
    salad: 0.3,
    cheese: 0.6,
    meat: 1.4,
    bacon: 0.7
};

//Poderia usar Fragment invez de HOC
class BurguerBuilder extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchaseable: false, //estado do order btn
            purchasing: false, //estado de abertura do modal,
            loading: false, //estado do spinner do modal,
            error: false //utilizado para nao mostrar um spinner eterno, caso o get falhe na requisição, msg personalizada para o proprio componente
        }

        this.componentDidMount = () => {
            axios.get('https://react-my-burguer-495a8-default-rtdb.firebaseio.com/ingredients.json')
                .then(response => {
                    this.setState({ ingredients: response.data })
                })
                .catch(err => {
                    this.setState({ error: true })
                })
        }

        //nesse exemplo nao crio outra copia do estado pq preciso trabalhar/atualizar aquele que recebo via parametro
        //se eu criar uma nova copia estaria trabalhando com o estado fora da sincronização apos usuario add ou remover elemento
        this.updatePurchaseState = ( ingredients ) => {
            const sum = Object.keys(ingredients)
                .map(igKey => ingredients[igKey])
                .reduce(( acc, element ) => acc + element, 0)
            
            this.setState({ purchaseable: sum > 0 }) //repare que aqui economizei um if
        }

        //lembre-se, estado é imutavel, sempre terei de retornar um novo, nesse caso um objeto
        this.addIngredientHandler = type => {
            const oldCount = this.state.ingredients[type]
            const updateCount = oldCount + 1
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updateCount

            const priceAddition = INGREDIENTS_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = priceAddition + oldPrice

            this.setState({ totalPrice: newPrice ,ingredients: updatedIngredients })

            this.updatePurchaseState(updatedIngredients)
        }

        this.removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type]
            const updateCount = oldCount - 1
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updateCount

            const priceAddition = INGREDIENTS_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice - priceAddition

            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })

            this.updatePurchaseState(updatedIngredients)
        }

        this.purchaseHandler = () => {
            this.setState({ purchasing: true })
        }

        this.purchaseCancelHandler = () => {
            this.setState({ purchasing: false })
        }

        this.purchaseContinueHandler = () => {
            const queryParams = []

            for(let index in this.state.ingredients) {
                queryParams.push(encodeURIComponent(index) + '=' + encodeURIComponent(this.state.ingredients[index]))
            }
            queryParams.push('price=' + this.state.totalPrice)

            const queryString = queryParams.join('&')

            this.props.history.push({
                pathname: '/checkout',
                search: '?' + queryString
            })
        }
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

       
        let orderSummary = null //null pois preciso declarar essa variavel global mas sem valor
        let burguer = this.state.error ? <p>Ingredients can't be loaded now!!</p> : <Spinner />

        //ingredients começa como null. Devido a utilização dele no componente burguer e ordersummary(buildControls foi so pra evitar bugs), preciso
        //criar essa condição para criar um loading, evitando que o codigo quebre
        if(this.state.ingredients) {
            burguer = (
                <WrapAux>
                    <Burguer ingredient={ this.state.ingredients } />
                        <BuildControls 
                            onAddIngredient={ this.addIngredientHandler }
                            onRemoveIngredient={ this.removeIngredientHandler }
                            disabledBtn={ disabledInfo }
                            totalPrice={ this.state.totalPrice }
                            purchaseable={ this.state.purchaseable }
                            ordered={ this.purchaseHandler }
                        />
            </WrapAux>
            )
            
            orderSummary = (
                <OrderSummary 
                    ingredients={ this.state.ingredients } 
                    purchaseContinued={ this.purchaseContinueHandler } 
                    purchaseCanceled={ this.purchaseCancelHandler }
                    price={ this.state.totalPrice }
                />
            )
        }
        if(this.state.loading) orderSummary = <Spinner /> //repare, se eu passar o orderSummary dentro de uma das duas condições ele nunca vai cair em null e ainda funcionara o esperado!


        return(
//A cada inserção de ingrediente o orderSummary mesmo sem ser chamado ainda no modal, é renderizado novamente. Observe que children foi add para identificar se deve colocar o spinner ao enviar(renderizar) ou não, se não colocar ele deixa de funcionar pois, o
//componente so vai atualizar/renderizar se eu passar as condições para tal, lembre-se que lá possui um shouldComponentUpdates
            <WrapAux>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                {burguer}
            </WrapAux>
        )
    }
}

export default withErrorHandler(BurguerBuilder, axios)