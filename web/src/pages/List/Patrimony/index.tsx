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

	const optionsOwners = [
		{ value: 1, label: 'Vinicius' },
		{ value: 2, label: 'Weusley' },
	]

	const optionSectors = [
		{ value: 1, label: 'UPA' },
		{ value: 2, label: 'Admin' },
	]

	const PatrimonyDatas: Patrimony[] = [
		{
			id: 1,
			model: 'Dell',
			ownerName: 'Vinicius Gazolla Boneto',
			patrimony: '656',
			sectorName: 'UPA',
			categoryName: 'Computador',
			ips: [
				{ id: 1, ip: '192.168.1.25', mask: '255.255.255.0', gateway: '192.168.1.1' },
				{ id: 2, ip: '192.168.2.25', mask: '255.255.255.0', gateway: '192.168.2.1' },
			]
		},
		{
			id: 2,
			model: 'SAMSUMG M4070FR',
			ownerName: 'Weusley William de Paula',
			patrimony: 'Locada',
			sectorName: 'Preventivo',
			categoryName: 'Impressora',
			ips: [
				{ id: 3, ip: '192.168.1.125', mask: '255.255.255.0', gateway: '192.168.1.1' }
			]
		},
		{
			id: 3,
			model: 'AOC',
			ownerName: 'Jessica',
			patrimony: '4587',
			sectorName: 'Compras',
			categoryName: 'Monitor',
		},
		{
			id: 4,
			model: 'Concordia',
			ownerName: 'Ivanice',
			patrimony: '458758',
			sectorName: 'Administração',
			categoryName: 'Computador',
			ips: [
				{ id: 4, ip: '192.168.1.55', mask: '255.255.255.0', gateway: '192.168.1.1' }
			]
		},
		{
			id: 5,
			model: 'TS-SHARA',
			ownerName: 'Gustavo',
			patrimony: '458789',
			sectorName: 'Administração',
			categoryName: 'Estabilizador',
		},
		{
			id: 6,
			model: 'POSITIVO',
			ownerName: 'Ana Zatta',
			patrimony: 'S/N',
			sectorName: 'Recursos Humanos',
			categoryName: 'Computador',
		}
	]

	const formRef = useRef<FormHandles>(null)
	const handleSubmit: SubmitHandler<FormData> = useCallback((data) => {
		console.log(data)
	}, [])

	const handleSearch = useCallback((e: MouseEvent) => {
		console.log('Searching....')
	}, [])

	const [patrimonies, setPatrimonies] = useState<Patrimony[]>(PatrimonyDatas)
	const [total, setTotal] = useState(0)
	const [pages, setPages] = useState<number[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 5

	useEffect(() => {
		setTotal(PatrimonyDatas.length)
		const totalPages = Math.ceil(total / limit)
		const arrayPages = []
		for (let i = 1; i <= totalPages; i++) {
			arrayPages.push(i)
		}
		setPages(arrayPages)
	}, [total, PatrimonyDatas.length])

	const handleSetPage = (page: number) => {
		if (page >= 1 && page <= pages.length) {
			setCurrentPage(page)
		}
	}

	return (
		<Container>
			<PageHeader title="O que procura ?" prev="/">
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Search>
						<Select name="owners" label="Proprietário" options={optionsOwners} />
						<Select name="owners" label="Setor" options={optionSectors} />
						<Input name="patrimony" label="Patrimônio" />
						<Select name="categories" label="Categoria" options={categories} />
						<Input name="ip" label="Ip" />
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
