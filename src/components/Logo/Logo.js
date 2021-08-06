import React from 'react'

import burguerLogo from '../../assets/Images/logo.png'
import './Logo.css'

//IMPORTANTE SEMPRE PASSAR A IMG DESSA FORMA, POIS O WEBPACK VAI TRABALHAR MELHOR NELA (PERFORMANCE/QUALIDADE) obs: por tras dos panos ele cria ela como um plugin especial e ja joga direto no bundle, nao mescla com esse codigo daqui
const Logo = (props) => (
    <div className="Logo" style={{ height: props.height }}>
        <img src={ burguerLogo } alt='MyBurguer' />
    </div>
)

export default Logo