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
	children?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, prev, titleStyle, children }) => {

	return (
		<Header>
			<TopBar>
				<Link to={prev}>
					<img src={prevIcon} alt="Voltar" />
				</Link>
			</TopBar>

			<Title justifyContent={titleStyle?.justifyContent} margin={titleStyle?.margin} >
				<strong>{title}</strong>
			</Title>

			{children}
		</Header>
	)
}

export default memo(PageHeader)
