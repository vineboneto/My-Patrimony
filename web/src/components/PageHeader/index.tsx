import React, { memo } from 'react'

import { Link } from 'react-router-dom'

import { Header, TopBar, Title } from './styled'

import prevIcon from 'assets/images/icons/prevIcon.svg'

export interface TitleStyle {
	justifyContent?: string;
	margin?: string;
}

interface PageHeaderProps {
	title: string;
	prev: "/"
	titleStyle?: TitleStyle
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

	return (
		<Header>
			<TopBar>
				<Link to={props.prev}>
					<img src={prevIcon} alt="Voltar" />
				</Link>
			</TopBar>

			<Title justifyContent={props.titleStyle?.justifyContent} margin={props.titleStyle?.margin} >
				<strong>{props.title}</strong>
			</Title>

			{props.children}
		</Header>
	)
}

export default memo(PageHeader)
