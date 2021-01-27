import React, { useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

import PageHeader from 'components/PageHeader'
import Select, { OptionValue } from 'components/Selects/Select'
import Input from 'components/Inputs/Input'
import AsyncSelectOwner from 'components/Selects/AsyncSelectOwner'

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

import swapIcon from 'assets/images/icons/updateIcon.svg'
import sendIcon from 'assets/images/icons/sendIcon.svg'

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

	const formSecondRef = useRef<FormHandles>(null)
	const formPrimaryRef = useRef<FormHandles>(null)

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />
			<OwnerItem>
				<Title>Primeiro Proprietário</Title>
				<Form ref={formPrimaryRef} onSubmit={() => { }}>
					<AsyncSelectOwner name="optionOwner" label="Nome" />
					<Input name="patrimonyNumber" label="Patrimônio" />
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
					<AsyncSelectOwner name="ownerId" label="Nome" />
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
