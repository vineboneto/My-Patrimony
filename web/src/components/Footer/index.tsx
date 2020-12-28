import React, { MouseEvent } from 'react'
import { Link } from 'react-router-dom'


import nextIcon from '../../assets/images/icons/nextIcon.svg'
import backIcon from '../../assets/images/icons/backIcon2.svg'

import './styles.css'

const Footer: React.FC  = ({ children }) => {
    return (
        <footer className="footer-block">
            <div className="footer-content">   
                {children}
            </div>
        </footer>
    )
} 

export default Footer