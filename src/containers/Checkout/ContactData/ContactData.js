import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' }
                    ]
                },
                value: '', //preciso passar para ativar o two way data binding
                validation: {}, //acrescentado para corrigir o bug de ao iterar o validation, ele nao existir.
                valid: true  //acrescentado para corrigir bug ao estar todos os campos validos mas, ainda fica desabilitado
            }
        },
        loading: false,
        formIsValid: false //propriedade que cuida do botao disabled do formulario
    }


    orderHandler = (event) => {
        event.preventDefault() //prevenir que a pagina atualize sem necessidade
        this.setState({ loading: true })
        
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }

            axios.post('/orders.json', order)
                .then(resp => {
                    this.setState({ loading: false })
                    this.props.history.push('/')
                    console.log(resp)
                })
                .catch(err => {
                    this.setState({ loading: false })
                    console.log(err)
                })
    }

    checkValidity = (value, rules) => {
        let isValid = true

        if(rules.required) isValid = value.trim() !== "" && isValid //preciso passar isValid na condição se nao ele sempre começara como valido, ignorando o required
        if(rules.minLength) isValid = value.length >= rules.minLength && isValid
        if(rules.maxLength) isValid = value.length <= rules.maxLength && isValid

        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {        
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = { //explicação do pq é utilizado dessa forma no txt de input
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value

        updatedFormElement.valid =  this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        console.log(updatedFormElement)

        updatedFormElement.touched = true

        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true

        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        console.log(formIsValid, this.state.formIsValid )

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }



    render() {
        const formElementsArray = []
        for(let key in this.state.orderForm ) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formElementsArray.map( formElement=> <Input 
                                                        key={ formElement.id }
                                                        elementType={ formElement.config.elementType }
                                                        elementConfig={ formElement.config.elementConfig }
                                                        value={ formElement.config.value }
                                                        invalid={ !formElement.config.valid }
                                                        hasTouched={ formElement.config.touched }
                                                        changed={(evento) => this.inputChangeHandler(evento, formElement.id) } /> )}
                <Button btnType="Success" clicked={ this.orderHandler } disabled={ !this.state.formIsValid }>ORDER</Button>
            </form>
        )
        if(this.state.loading) form = <Spinner />
                
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        )
    }
}

export default ContactData