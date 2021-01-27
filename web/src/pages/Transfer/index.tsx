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
	PatrimonyContainer,
	ButtonSend,
	ButtonSwap,
	ButtonContainer,
	SearchButton
} from './styled'

import swapIcon from 'assets/images/icons/updateIcon.svg'
import sendIcon from 'assets/images/icons/sendIcon.svg'
import api from 'services/api'

interface ApiPatrimoniesData {
	id: number;
	model: string;
	number: string;
	Category: {
		id: number,
		name: string
	};
}

interface FormData {
	patrimonyNumber: string;
	optionOwner: number;
}

interface PropsStatePatrimony {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
}

const Swap = () => {

	const patrimoniesSecondOwner = [
		{ categoryName: 'Estabilizador', model: 'TS-SHARA', patrimony: '456287' },
		{ categoryName: 'Impressora', model: 'Samsumg', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'Dell', patrimony: '45879' },
		{ categoryName: 'Monitor', model: 'POSITIVO', patrimony: '45231' },
		{ categoryName: 'Monitor', model: 'POSITIVO', patrimony: '45231' }
	]

	const [patrimoniesFirstOwner, setPatrimoniesFirstOwner] = useState<PropsStatePatrimony[]>([])
	const formPrimaryRef = useRef<FormHandles>(null)
	const formSecondRef = useRef<FormHandles>(null)

	const handleSubmitFirstOwner: SubmitHandler<FormData> = async (data) => {
		const patrimonies = await getApiPatrimoniesDataById(data.optionOwner)
		setPatrimoniesFirstOwner(convertToPatrimoniesData(patrimonies))
	}

	const convertToPatrimoniesData = (datas: ApiPatrimoniesData[]) => {
		const patrimonies = datas.map(data => {
			return {
				id: data.id,
				model: data.model,
				patrimonyNumber: data.number,
				categoryName: data.Category.name
			}
		})
		return patrimonies
	}

	const getApiPatrimoniesDataById = async (id: number) => {
		const url = `owners/${id}/patrimonies`
		const response = await api.get(url)
		return response.data
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
				<PatrimonyContainer>
					{patrimoniesFirstOwner.map((patrimony: any, index) =>
						<PatrimonyItem key={patrimony.id}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</PatrimonyItem>
					)}
				</PatrimonyContainer>
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
				<PatrimonyContainer>
					{patrimoniesSecondOwner.map((patrimony, index) =>
						<PatrimonyItem key={index}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</PatrimonyItem>
					)}
				</PatrimonyContainer>
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
