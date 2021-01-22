import React, {
	MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

import PatrimonyItem, { Patrimony } from 'components/PatrimonyItem'
import PageHeader from 'components/PageHeader'
import Select, { OptionSelect } from 'components/Select'
import Input from 'components/Inputs/Input'

import {
	Container,
	Search,
	SearchIcon,
	Main,
	Pagination,
	Pages,
	Page
} from './styled'

import searchIcon from 'assets/images/icons/searchIcon.svg'
import api from 'services/api'

interface FormData {
	ownerId: number
	sectorId: number
	patrimony: string
}

interface DataProps {
	id: number;
	name: string;
}

const PatrimonyList: React.FC = () => {

	const [categories, setCategories] = useState<OptionSelect[]>([]);
	const [owners, setOwners] = useState<OptionSelect[]>([]);
	const [sectors, setSectors] = useState<OptionSelect[]>([]);
	const [patrimonies, setPatrimonies] = useState<Patrimony[]>([])

	const [total, setTotal] = useState(0)
	const [pages, setPages] = useState<number[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 5

	useEffect(() => {
		setTotal(5)
		const totalPages = Math.ceil(total / limit)
		const arrayPages = []
		for (let i = 1; i <= totalPages; i++) {
			arrayPages.push(i)
		}
		setPages(arrayPages)
	}, [total])

	const handleSetPage = (page: number) => {
		if (page >= 1 && page <= pages.length) {
			setCurrentPage(page)
		}
	}

	useEffect(() => {
		async function setOptionsCategories() {
			const response = await api.get('categories')
			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setCategories(options)
		}
		setOptionsCategories()
	}, [])

	useEffect(() => {
		async function setOptionsSectors() {
			const response = await api.get('sectors')
			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setSectors(options);
		}
		setOptionsSectors();
	}, [])

	useEffect(() => {
		async function setOptionsOwner() {
			const response = await api.get('owners');
			const options = response.data.map((data: DataProps) => {
				return {
					value: data.id,
					label: data.name
				}
			})
			setOwners(options);
		}
		setOptionsOwner();
	}, [])

	useEffect(() => {
		async function loadPatrimonies() {
			const response = await api.get(`patrimonies?page=${currentPage}&limit=${limit}`)
			const listing = response.data.map((data: Patrimony) => {

			})
		}
		loadPatrimonies();
	}, [])

	const formRef = useRef<FormHandles>(null)
	const handleSubmit: SubmitHandler<FormData> = useCallback((data) => {
		console.log(data)
	}, [])

	const handleSearch = useCallback((e: MouseEvent) => {
		console.log('Searching....')
	}, [])

	return (
		<Container>
			<PageHeader title="O que procura ?" prev="/">
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Search>
						<Select name="owners" label="Proprietário" options={owners} />
						<Select name="owners" label="Setor" options={sectors} />
						<Input name="patrimony" label="Patrimônio" />
						<Select name="categories" label="Categoria" options={categories} />
						<Input name="ip" label="Ip" />
						<Input name="model" label="Modelo" />
						<SearchIcon>
							<img src={searchIcon} alt="Realizar Busca" onClick={handleSearch} />
						</SearchIcon>
					</Search>
				</Form>
			</PageHeader>

			<Main>
				{patrimonies.map(patrimony =>
					<PatrimonyItem patrimony={patrimony} />
				)}
			</Main>

			<Pagination>
				<Pages>
					<Page onClick={() => handleSetPage(currentPage - 1)}>Anterior</Page>
					{pages.map((page, index) =>
						<Page
							key={index}
							current={currentPage === page ? true : false}
							onClick={() => handleSetPage(page)}
						>
							{page}
						</Page>
					)}
					<Page onClick={() => handleSetPage(currentPage + 1)}>Proxíma</Page>
				</Pages>
			</Pagination>
		</Container>
	)


}

export default PatrimonyList
