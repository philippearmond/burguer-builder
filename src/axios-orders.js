import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burguer-495a8-default-rtdb.firebaseio.com/' //URL disponibilizada pelo firebase(API REST)
})

export default instance