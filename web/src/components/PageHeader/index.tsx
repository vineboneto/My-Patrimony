import React from 'react'

import { Link } from 'react-router-dom'

import { Header, TopBar, Title } from './styled'

import prevIcon from 'assets/images/icons/prevIcon.svg'


interface PageHeaderProps {
    title: string;
    linkPrev: {
        pathname: string,
        state?: {
            owner: string
            sector: string
        }
    } | string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    
    return(
        // <header className="page-header">
        <Header>
            
            <TopBar>
                <Link to={props.linkPrev}>
                    <img src={prevIcon} alt="Voltar"/>
                </Link>
            </TopBar>

            <Title>
                <strong>{props.title}</strong>
            </Title>

            {props.children}
        </Header>
        // </header>
    )
}

export default PageHeader