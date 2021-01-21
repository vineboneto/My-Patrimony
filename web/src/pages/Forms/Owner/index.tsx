import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import Dialog from '@material-ui/core/Dialog'
import * as Yup from 'yup'
import { Form } from '@unform/web'

import Select from 'components/Select'
import Input from 'components/Inputs/Input'
import Button, { Plus } from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'
import SectorForm from '../Sector'

import { Content } from './styled'
import api from 'services/api'

interface FormData {
	owner: string;
	sectorId: number;
}

interface Sector {
	id: number;
	name: string;
}

interface Props {
	onClose: () => void;
}

const OwnerForm: React.FC<Props> = ({ onClose }) => {

	const [optionsSectors, setOptionsSectors] = useState([
		{ value: -1, label: '' }
	])

	useEffect(() => {
		async function handleSetOptionsSector() {
			const response = await api.get('/sectors')
			const options = response.data.map((data: Sector) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setOptionsSectors(options)
		}
		handleSetOptionsSector()
	}, [])

	const [open, setOpen] = useState(false)
	const handleCloseDialog = useCallback(() => {
		setOpen(false)
	}, [])

	const handleOpenDialog = useCallback(() => {
		setOpen(true)
	}, [])

	const formRef = useRef<FormHandles>(null)
	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
		try {
			const messageError = 'obrigatório'
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome ' + messageError),
				sectors: Yup.number().moreThan(-1, 'Setor ' + messageError).required(messageError),
			})

			await schema.validate(data, {
				abortEarly: false
			})

			formRef.current?.setErrors({})

			const ownerName = formRef.current?.getFieldValue('name')
			const sectorId = formRef.current?.getFieldValue('sectors')

			api.post('owners', {
				name: ownerName,
				sectorId: sectorId
			}).then(() => {
				onClose();
				alert('Proprietário cadastrado com sucesso');

			}).catch((err) => {
				alert(err)
			})

			reset()
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					if (error.path) {
						formRef.current?.setFieldError(error.path, error.message)
					}
				})
			}
		}
	}

	return (
		<DialogContainer>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Content>

					<Title>Novo Proprietário</Title>

					<Input name="name" label="Nome" />

					<Plus type="button" onClick={handleOpenDialog} />
					<Select name="sectors" label="Setor" options={optionsSectors} />

					<Button>
						Salvar
					</Button>
				</Content>
			</Form>
			{/**
			 * Dialogs Forms em Forms diferentes
			 */}
			<Dialog open={open} onClose={handleCloseDialog}>
				<SectorForm onClose={handleCloseDialog} />
			</Dialog>
		</DialogContainer>
	)
}

export default OwnerForm
