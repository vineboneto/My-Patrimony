import React from 'react'

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