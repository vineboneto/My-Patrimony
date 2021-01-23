import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import Dialog from '@material-ui/core/Dialog'
import Collapse from '@material-ui/core/Collapse'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Inputs/Input'
import MultiInputs, { MultiInputsHandles, Field } from 'components/Inputs/MultiInputs'
import Select, { OptionSelect } from 'components/Select'
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
	Footer,
	SSnackbar as Snackbar
} from './styled'
import api from 'services/api'
import { useParams } from 'react-router-dom'
import Alert from "@material-ui/lab/Alert";



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

interface DataProps {
	id: number;
	name: string;
}

interface Params {
	id?: string
}

const PatrimonyForm: React.FC = () => {
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

	const [sectors, setSectors] = useState<OptionSelect[]>([])
	const [categories, setCategories] = useState<OptionSelect[]>([])
	const [owners, setOwners] = useState<OptionSelect[]>([])

	useEffect(() => {
		async function setOptionsSectors() {
			const response = await api.get('sectors');

			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setSectors(options);
		}
		setOptionsSectors();
	}, [openDialogOwner])

	useEffect(() => {
		async function setOptionsOwners() {
			const response = await api.get('owners');

			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name,
				}
			})
			setOwners(options);
		}
		setOptionsOwners();
	}, [openDialogOwner])

	useEffect(() => {
		async function setOptionsCategory() {
			const response = await api.get('categories')

			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setCategories(options)
		}
		setOptionsCategory()
	}, [openDialogCategory])

	const params = useParams<Params>();
	useEffect(() => {
		if (params.id) {
			formRef.current?.setData({

			})
		}
	}, [])

	const DEFAULT_DATA = {
		ips: [{ ip: '', mask: '', gateway: '' }],
		categoryId: { value: -1, label: 'Selecione' },
		sectorId: { value: -1, label: 'Selecione' },
		ownerId: { value: -1, label: 'Selecione' },
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
	const [openMessageSuccess, setOpenMessageSuccess] = useState(false);
	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({
				patrimony: Yup.string().required('Patrimônio obrigatório'),
				model: Yup.string().required('Modelo obrigatório '),
				ownerId: Yup.number().moreThan(-1, 'Proprietário obrigatório').required('Proprietário obrigatório'),
				categoryId: Yup.number().moreThan(-1, 'Categoria obrigatória').required('Categoria obrigatória'),
			})

			await schema.validate(data, {
				abortEarly: false
			})

			const newIps = data.ips.map((ip) => {
				if (ip.ip === '') return []
				else return ip
			})

			await api.post('patrimonies', {
				patrimony: data.patrimony,
				model: data.model,
				description: data.description,
				ownerId: data.ownerId,
				categoryId: data.categoryId,
				ips: newIps
			}).then(() => {
				setOpenMessageSuccess(true);
			}).catch((err) => {
				alert(err)
			})

			formRef.current?.setErrors({})
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

	const setOwnerTheSector = async () => {
		const response = await api.get('owners')
		const currentOwnerId = formRef.current?.getFieldValue('ownerId')
		const owner = response.data.filter((data: any) => data.id === currentOwnerId)[0]
		if (owner) formRef.current?.setFieldValue('sectorId', owner.sectorId)
		else formRef.current?.setFieldValue('sectorId', -1)
	}

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
							<Select name="ownerId" label="Proprietário" options={owners} onChange={setOwnerTheSector} />
							<Select name="sectorId" label="Setor" options={sectors} isDisabled={true} />
						</OwnerData>
					</Fieldset>
					<Fieldset>
						<Legend>Patrimônio</Legend>
						<PatrimonyData>
							<Plus type="button" onClick={handleOpenDialogCategory} />
							<Select name="categoryId" label="Categoria" options={categories} />
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

				<Snackbar open={openMessageSuccess} autoHideDuration={2000} onClose={() => setOpenMessageSuccess(false)}>
					<Alert onClose={() => setOpenMessageSuccess(false)} severity="success">
						Cadastrado com sucesso
					 </Alert>
				</Snackbar>
			</Main>

		</Container>
	)
}
export default PatrimonyForm
