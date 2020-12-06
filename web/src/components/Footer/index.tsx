import React from 'react'
import { Link } from 'react-router-dom'

import monitorIcon from '../../assets/imgs/icons/monitorIcon.svg'
import nextIcon from '../../assets/imgs/icons/nextIcon.svg'

import './styles.css'

interface FooterProps {
    next: string
    prev?: string
}

const Footer: React.FC<FooterProps>  = ({ next, prev }) => {
    return (
        <footer className="footer-block">
            <div className="footer-content">
                <button>
                    Salvar Patrimônio
                </button>

                <div className="link-next">
                    <Link to={next}>
                        <img src={monitorIcon} alt="Monitor"/>
                        <img src={nextIcon} alt="Proxíma pagína"/>
                    </Link>
                </div>
            </div>
        </footer>
    )
} 

export default Footer