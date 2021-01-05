import React from 'react'

import { Link } from 'react-router-dom'

import okIcon from '../../assets/images/icons/okIcon.svg'
import updateIcon from '../../assets/images/icons/updateIcon.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'

import { Container, Header, TopBar, Title, Content, Actions } from './styled'

const Home: React.FC  = () => {
    return (

        <Container>
            
            <Header>
                <TopBar>
                    <span>Meu Patrimônio</span>    
                </TopBar>

                <Title>
                    <strong>Bem vindo</strong>
                </Title>
            </Header>

            <Content>
                
                <h1>O que você quer fazer ?</h1>
                <Actions>
                    <Link to="/patrimony/create">
                        Novo Patrimônio
                        <img src={okIcon} alt="Novo Patrimônio"/>
                    </Link>

                    <Link to="/patrimonies">
                        Buscar Patrimônio
                        <img src={searchIcon} alt="Buscar Patriônio"/>
                    </Link>

                    <Link to="/patrimony/create"> 
                        Realizar Trocar
                        <img src={updateIcon} alt="Realizar troca de patrimônio" />
                    </Link>
                </Actions>
            </Content>
        </Container>

    )
}

export default Home