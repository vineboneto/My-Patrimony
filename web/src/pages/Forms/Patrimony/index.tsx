import React, { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup'
import Dialog from '@material-ui/core/Dialog'
import Collapse from '@material-ui/core/Collapse'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Inputs/Input'
import MultiInputs, { MultiInputsHandles, Field } from 'components/Inputs/MultiInputs'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import PageHeader from 'components/PageHeader'
import Button, { ButtonCollapse, Create, Plus } from 'components/Button'
import { Fieldset, Legend } from 'components/Fieldset/styled'
import OwnerForm from '../Owner'
import CategoryForm from '../Category'
import { StyledDialog } from 'components/DialogContainer/styled'

import {
	Container,
	Main,
	OwnerData,
	PatrimonyData,
	IpData,
	Footer
} from './styled'


interface Ip {
	id?: number
	ip: string
	mask: string
	gateway: string
}

interface FormData {
	patrimony: string
	model: string
	description: string
	categoryId: string
	ownerId: string
	sectorId: string
	ips: Ip[]
}

const PatrimonyForm: React.FC = () => {

	const optionSector = [
		{ value: 2, label: 'Compras' },
		{ value: 3, label: 'Admin' }
	]

	const optionCategory = [
		{ value: 2, label: 'Computador' },
		{ value: 3, label: 'Impressora' }
	]

	const optionOwners = [
		{ value: 2, label: 'Vinicius' },
		{ value: 3, label: 'Weusley' }
	]

	const DEFAULT_DATA = {
		ips: [{ ip: '', mask: '', gateway: '' }]
	}

	const fields: Field[] = [
		{ name: 'ip', label: 'Ip', placeholder: '192.168.1.11' },
		{ name: 'mask', label: 'Mascara', placeholder: '255.255.255.0' },
		{ name: 'gateway', label: 'Gateway', placeholder: '192.168.1.1' },
	]

	const [openCollapse, setCollapseOpen] = useState(false)
	const handleOpenCollapse = useCallback(() => {
		setCollapseOpen(!openCollapse)
	}, [openCollapse])

	const multiInputsRef = useRef<MultiInputsHandles>(null)
	const handleAddIpItem = useCallback(() => {
		multiInputsRef.current?.addLine()
	}, [])

	const formRef = useRef<FormHandles>(null)
	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {

		try {
			const schema = Yup.object().shape({
				patrimony: Yup.string().required('Patrimônio obrigatório'),
				model: Yup.string().required('Modelo obrigatório '),
				owners: Yup.number().moreThan(-1, 'Proprietário obrigatório').required('Proprietário obrigatório'),
				categories: Yup.number().moreThan(-1, 'Categoria obrigatória').required('Categoria obrigatória'),
				ips: Yup.array().of(
					Yup.object().shape({
						ip: Yup.string().required(),
						gateway: Yup.string().required(),
						mask: Yup.string().required()
					})
				)
			})

			await schema.validate(data, {
				abortEarly: false
			})

			formRef.current?.setErrors({})

			reset()
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					if (error.path) {
						console.log(error.path)
						formRef.current?.setFieldError(error.path, error.message)
					}
				})
			}
		}
	}

	const [openDialogCategory, setOpenDialogCategory] = useState(false)
	const handleOpenDialogCategory = useCallback(() => {
		setOpenDialogCategory(true)
	}, [])

	const handleCloseDialogCategory = useCallback(() => {
		setOpenDialogCategory(false)
	}, [])

	const [openDialogOwner, setOpenDialogOwner] = useState(false)
	const handleOpenDialogOwner = useCallback(() => {
		setOpenDialogOwner(true)
	}, [])

	const handleCloseDialogOwner = useCallback(() => {
		setOpenDialogOwner(false)
	}, [])

	return (
		<Container>

			<PageHeader title="Novo Patrimônio" prev="/" />

			<Main>
				<Form ref={formRef} onSubmit={handleSubmit} initialData={DEFAULT_DATA}>

					<Fieldset>
						<Legend>
							Proprietário
								<Create type="button" onClick={handleOpenDialogOwner}>
								+ Novo Proprietário
								</Create>
						</Legend>

						<OwnerData>
							<Select name="owners" label="Proprietário" options={optionOwners} />
							<Select name="sectors" label="Setor" options={optionSector} />
						</OwnerData>
					</Fieldset>

					<Fieldset>
						<Legend>Patrimônio</Legend>
						<PatrimonyData>
							<Plus type="button" onClick={handleOpenDialogCategory} />
							<Select name="categories" label="Categoria" options={optionCategory} />
							<Input name="patrimony" label="Patrimônio" />
							<Input name="model" label="Modelo" />
							<Textarea name="description" label="Descrição" />
						</PatrimonyData>
					</Fieldset>


					<ButtonCollapse type="button" onClick={handleOpenCollapse}>
						{openCollapse ? 'Fechar' : 'Adicionar Ips'}
					</ButtonCollapse>
					<Fieldset padding="0 3.4rem">
						<Collapse in={openCollapse}>
							<Legend padding="3.4rem 0 0">
								Ips
								<Create type="button" onClick={handleAddIpItem}>+ Novo Ip</Create>
							</Legend>

							<IpData>

								<MultiInputs
									ref={multiInputsRef}
									name="ips"
									fields={fields}
									itemData={{ ip: '', mask: '', gateway: '' }}
								/>

							</IpData>

						</Collapse>
					</Fieldset>

					<Footer>
						<Button type="submit">
							Salvar
						</Button>
					</Footer>

				</Form>
				{/**
					 * Dialogs Forms não podem ficam dentro de um mesmo form devido ao submit
					 */}
				<StyledDialog open={openDialogOwner} onClose={handleCloseDialogOwner}>
					<OwnerForm onClose={handleCloseDialogOwner} />
				</StyledDialog>

				<Dialog open={openDialogCategory} onClose={handleCloseDialogCategory} aria-labelledby="form-dialog-title">
					<CategoryForm onClose={handleCloseDialogCategory} />
				</Dialog>
			</Main>

		</Container>
	)
}

export default PatrimonyForm
