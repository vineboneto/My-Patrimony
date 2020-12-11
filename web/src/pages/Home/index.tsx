import React from 'react'

import { Link } from 'react-router-dom'

import okIcon from '../../assets/images/icons/okIcon.svg'
import updateIcon from '../../assets/images/icons/updateIcon.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'

import './styles.css'

const Home: React.FC  = () => {
    return (

        <div id="page-patrimony-home">
            
            <header className="page-patrimony-header">
                <div className="top-bar-container">
                    <span>Meu Patrimônio</span>    
                </div>

                <div className="header-content">
                    <strong>Bem vindo</strong>
                </div>
            </header>

            <main>
                
                <h1>O que você quer fazer ?</h1>
                <div className="link-block">
                    <Link to="/computer-register">
                        Novo Patrimônio
                        <img src={okIcon} alt="Novo Patrimônio"/>
                    </Link>

                    <Link to="/computer-register">
                        Buscar Patrimônio
                        <img src={searchIcon} alt="Buscar Patriônio"/>
                    </Link>

                    <Link to="/computer-register"> 
                        Realizar Trocar
                        <img src={updateIcon} alt="Realizar troca de patrimônio" />
                    </Link>
                </div>
            </main>
        </div>

    )
}

export default Home