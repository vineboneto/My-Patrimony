import React from 'react'
import { Link } from 'react-router-dom'

import deleteForeverIcon from '../../assets/images/icons/deleteForeverIcon.svg'
import editIcon from '../../assets/images/icons/editIcon.svg'

import './styles.css'

interface PatrimonyItemPros {
    owner: string
    sector: string
    info: {
        type: string,
        patrimony: string,
        model: string
        ips?: Array<string>
    }
}

const PatrimonyItem: React.FC<PatrimonyItemPros> = ({ owner, sector, info }) => {
    return (
        <div className="patrimony-item">
            <div className="patrimony-header">
                <h2>{owner}</h2>
                <span>{sector}</span>
            </div>

            <div className="patrimony-content">
                <div className="info">
                    <h3>{info.type}</h3>
                    <p><span>Patrimônio:</span> {info.patrimony}</p>
                    <p><span>Modelo:</span> {info.model}</p>
                    {info.ips &&    
                        <p><span>Ips:</span> {info.ips.map((ip, index) => {
                            if (info.ips && index !== info.ips.length - 1) {
                                return ip + ', '
                            }
                            return ip
                        })} </p>
                    }
                    
                </div>

                <div className="patrimony-action">
                    <Link to="/">
                        <img src={deleteForeverIcon} alt="Excluir"/>
                    </Link>
                    <Link to="/">
                        <img src={editIcon} alt="Editar"/>
                    </Link>
                </div>
            </div>  

        </div>
    )
}

export default PatrimonyItem