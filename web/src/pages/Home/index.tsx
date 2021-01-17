import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, TopBar, Title, Content, Actions } from './styled'

import okIcon from '../../assets/images/icons/okIcon.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'
import updateIcon from '../../assets/images/icons/updateIcon.svg'

const Home: React.FC = () => {
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
						<img src={okIcon} alt="Novo Patrimônio" />
					</Link>

					<Link to={{
						pathname: '/patrimonies',
						search: 'page=1&limit=5'
					}}>
						Buscar Patrimônio
						<img src={searchIcon} alt="Buscar Patriônio" />
					</Link>

					<Link to="/patrimony/swap">
						Realizar Trocar
						<img src={updateIcon} alt="Realizar troca de patrimônio" />
					</Link>
				</Actions>
			</Content>
		</Container>

	)
}

export default Home
