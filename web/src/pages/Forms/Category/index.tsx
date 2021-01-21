import React, { useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from 'components/Inputs/Input'
import Button from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'

import { Content } from '../Sector/styled'
import api from 'services/api'

interface Props {
	onClose: () => void
}

const CategoryForm: React.FC<Props> = ({ onClose }) => {

	const formRef = useRef<FormHandles>(null)
	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
		try {
			const messageError = 'obrigatório'
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome ' + messageError),
			})

			await schema.validate(data, {
				abortEarly: false
			})

			formRef.current?.setErrors({})

			const categoryName = formRef.current?.getFieldValue('name')

			api.post('categories', {
				name: categoryName
			}).then(() => {
				alert('Categoria Cadastrado com sucesso');
				onClose();
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
					<Title>Nova Categoria</Title>

					<Input name="name" label="Nome" />
					<Button>
						Salvar
					</Button>
				</Content>
			</Form>
		</DialogContainer>
	)
}

export default CategoryForm
