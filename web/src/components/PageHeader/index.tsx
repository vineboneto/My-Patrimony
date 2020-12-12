import React from 'react'

import { Link } from 'react-router-dom'

import prevIcon from '../../assets/images/icons/prevIcon.svg'

import './styles.css'

interface PageHeaderProps {
    title: string;
    linkPrev: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    
    return(
        <header className="page-header">
            
            <div className="top-bar-container">
                <Link to={props.linkPrev}>
                    <img src={prevIcon} alt="Voltar"/>
                </Link>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
            </div>

            {props.children}
        </header>
    )
}

export default PageHeader