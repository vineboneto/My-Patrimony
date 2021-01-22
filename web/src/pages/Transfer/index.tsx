import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import PageHeader from 'components/PageHeader'
import Select from 'components/Select'
import Input from 'components/Inputs/Input'

import {
	Container,
	OwnerItem,
	Title,
	Box,
	CategoryName,
	ContainerBox,
	ButtonSend,
	ButtonSwap,
	ButtonContainer
} from './styled'

import swapIcon from '../../assets/images/icons/updateIcon.svg'
import sendIcon from '../../assets/images/icons/sendIcon.svg'

const Swap = () => {

	const optionsOwner = [
		{ value: 1, label: 'Vinicius Gazolla Boneto' },
		{ value: 2, label: 'Weusley William de Paula' }
	]

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

	const formPrimaryRef = useRef<FormHandles>(null)
	const formSecondRef = useRef<FormHandles>(null)

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<OwnerItem>
				<Title>Primeiro Proprietário</Title>
				<Form ref={formPrimaryRef} onSubmit={() => { }}>
					<Select name="owners" label="Nome" options={optionsOwner} />
					<Input name="patrimony" label="Patrimônio" />
				</Form>
				<ContainerBox>
					{patrimoniesFirstOwner.map((patrimony, index) =>
						<Box key={index}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</Box>
					)}
				</ContainerBox>
			</OwnerItem>
			<OwnerItem>
				<Title>Segundo Proprietário</Title>
				<Form ref={formSecondRef} onSubmit={() => { }}>
					<Select name="owners" label="Nome" options={optionsOwner} />
					<Input name="patrimony" label="Patrimônio" />
				</Form>
				<ContainerBox>
					{patrimoniesSecondOwner.map((patrimony, index) =>
						<Box key={index}>
							<CategoryName>{patrimony.categoryName}</CategoryName>
							<span>{patrimony.model}</span>
							<span>{patrimony.patrimony}</span>
						</Box>
					)}
				</ContainerBox>
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
