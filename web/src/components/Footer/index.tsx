import React, { MouseEvent } from 'react'
import { Link } from 'react-router-dom'


import nextIcon from '../../assets/images/icons/nextIcon.svg'
import backIcon from '../../assets/images/icons/backIcon2.svg'

import './styles.css'

interface FooterProps {
    toNext?: object
    toPrev?: object
    iconPrev?: string
    iconNext?: string
    labelButtonSave?: string
    handleButton?: (e: MouseEvent) => void
}

const Footer: React.FC<FooterProps>  = ({ toNext, toPrev, iconNext, iconPrev, labelButtonSave, handleButton }) => {
    return (
        <footer className="footer-block">
            <div className="footer-content">
                {toPrev  && 
                    <div className="link">
                        <Link to={toPrev || '/'}>
                            <img src={backIcon} alt="Página anterior"/>
                            <img src={iconPrev} alt={iconPrev}/>
                        </Link>
                    </div>
                }
                <div className="next-block">
                    {handleButton &&
                        <button onClick={(e) => handleButton(e)}>
                            {labelButtonSave}
                        </button>
                    }
                    {toNext && 
                        <div className="link">
                            <Link to={toNext || '/'} >
                                <img src={iconNext} alt="Impressora"/>
                                <img src={nextIcon} alt="Proxíma pagína"/>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </footer>
    )
} 

export default Footer