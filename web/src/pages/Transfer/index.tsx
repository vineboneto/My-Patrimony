import React, { useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

import PageHeader from 'components/PageHeader'
import Input from 'components/Inputs/Input'
import AsyncSelectOwner from 'components/Selects/AsyncSelectOwner'

import searchIcon from 'assets/images/icons/searchIcon.svg'

import {
	Container,
	OwnerItem,
	Title,
	PatrimonyItem,
	CategoryName,
	PatrimonyData,
	ButtonSend,
	ButtonSwap,
	ButtonContainer,
	SearchButton
} from './styled'

import swapIcon from 'assets/images/icons/updateIcon.svg'
import sendIcon from 'assets/images/icons/sendIcon.svg'
import api from 'services/api'

interface FormData {
	patrimonyNumber: string;
	optionOwner: number;
}

const Swap = () => {

	const patrimoniesFirstOwner = [
		{ categoryName: 'Estabilizador', model: 'TS-SHARA', patrimony: '456287' },
		{ categoryName: 'Impressora', model: 'Samsumg', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'Dell', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'POSITIVO', patrimony: '45231' }
	]

	const patrimoniesSecondOwner = [
		{ categoryName: 'Estabilizador', model: 'TS-SHARA', patrimony: '456287' },
		{ categoryName: 'Impressora', model: 'Samsumg', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'Dell', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'POSITIVO', patrimony: '45231' },
		{ categoryName: 'Monitor', model: 'POSITIVO', patrimony: '45231' }
	]

	const [patrimoniesFistOwner, setPatrimoniesFistOwner] = useState([])
	const formPrimaryRef = useRef<FormHandles>(null)
	const formSecondRef = useRef<FormHandles>(null)

	const handleSubmitFirstOwner: SubmitHandler<FormData> = async (data) => {
		const response = await api.get(`owners/${data.optionOwner}/patrimonies`)
		console.log(response.data)
	}


	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<OwnerItem>
				<Title>Primeiro Proprietário</Title>
				<Form ref={formPrimaryRef} onSubmit={handleSubmitFirstOwner}>
					<AsyncSelectOwner name="optionOwner" label="Nome" />
					<Input name="patrimonyNumber" label="Patrimônio" />
					<SearchButton>
						<img src={searchIcon} alt="Buscar" />
					</SearchButton>
				</Form>
				<PatrimonyData>
					{patrimoniesFirstOwner.map((patrimony, index) =>
						<PatrimonyItem key={index}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</PatrimonyItem>
					)}
				</PatrimonyData>
			</OwnerItem>

			<OwnerItem>
				<Title>Segundo Proprietário</Title>
				<Form ref={formSecondRef} onSubmit={() => { }}>
					<AsyncSelectOwner name="ownerId" label="Nome" />
					<Input name="patrimony" label="Patrimônio" />
					<SearchButton>
						<img src={searchIcon} alt="Buscar" />
					</SearchButton>
				</Form>
				<PatrimonyData>
					{patrimoniesSecondOwner.map((patrimony, index) =>
						<PatrimonyItem key={index}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</PatrimonyItem>
					)}
				</PatrimonyData>
			</OwnerItem>

			<ButtonContainer>
				<ButtonSwap>
					Trocar
						<img src={swapIcon} alt="Trocar Patrimônios" />
				</ButtonSwap>
				<ButtonSend>
					Transferir
						<img src={sendIcon} alt="Transferir Patriônio" />
				</ButtonSend>
			</ButtonContainer>
		</Container>
	)
}

export default Swap
