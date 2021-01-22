import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import deleteForeverIcon from 'assets/images/icons/deleteForeverIcon.svg'
import editIcon from 'assets/images/icons/editIcon.svg'

import {
	Item,
	Header,
	Content,
	Info,
	Ip as IpInfo,
	Actions
} from './styled'

interface Ip {
	id: number
	ip: string
	mask: string
	gateway: string
}

interface Sector {
	id: number;
	name: string;
}

interface Owner {
	id: number;
	name: string;
	sector: Sector;
}

interface Category {
	id: number;
	name: string;
}

export interface Patrimony {
	id: number;
	model: string;
	number: string;
	description: string;
	owner: Owner;
	category: Category;
	ips?: Ip[];
}

interface PatrimonyItemProps {
	patrimony: Patrimony
}

const PatrimonyItem: React.FC<PatrimonyItemProps> = ({ patrimony }) => {

	return (
		<Item>
			<Header>
				<h2>{patrimony.owner.name}</h2>
				<span>{patrimony.owner.sector.name}</span>
			</Header>

			<Content>
				<Info>
					<h3>{patrimony.category.name}</h3>
					<p><span>Patrimônio:</span> {patrimony.number}</p>
					<p><span>Modelo:</span> {patrimony.model}</p>
					{patrimony.ips &&
						<IpInfo><span>Ips: </span>
							{patrimony.ips.map((ip: Ip, index: number) => {
								if (index === (Number(patrimony.ips?.length) - 1)) return <span key={index}>{ip.ip}</span>
								else return <span key={index}>{ip.ip}, </span>

							})}
						</IpInfo>
					}
				</Info>

				<Actions>
					<Link to="/">
						<img src={deleteForeverIcon} alt="Excluir" />
					</Link>
					<Link to={{
						pathname: `/patrimony/edit/${patrimony.id}`
					}}>

						<img src={editIcon} alt="Editar" />
					</Link>
				</Actions>
			</Content>

		</Item>
	)
}

export default memo(PatrimonyItem)
