import React from 'react'
import { Link } from 'react-router-dom'

import deleteForeverIcon from '../../assets/images/icons/deleteForeverIcon.svg'
import editIcon from '../../assets/images/icons/editIcon.svg'

import './styles.css'

export interface Patrimony {
    id: number
    patrimony: string
    model: string
    description: string
    ownerId: number
    sectorId: number
    typeId: number
    ownerName: string
    sectorName: string
    typeName: string
    ips: []
}

interface PatrimonyItemProps {
    patrimony: Patrimony
}

const PatrimonyItem: React.FC<PatrimonyItemProps> = ({ patrimony }) => {
    return (
        <div className="patrimony-item">
            <div className="patrimony-header">
                <h2>{patrimony.ownerName}</h2>
                <span>{patrimony.sectorName}</span>
            </div>

            <div className="patrimony-content">
                <div className="info">
                    <h3>{patrimony.typeName}</h3>
                    <p><span>Patrimônio:</span> {patrimony.patrimony}</p>
                    <p><span>Modelo:</span> {patrimony.model}</p>

                    {patrimony.ips &&    
                        <p><span>Ips: </span>
                        {patrimony.ips.map((ip, index) => {
                            if (patrimony.ips !== undefined && patrimony.ips.length - 1 === index) {
                                return ip[1]
                            }
                            return ip[1] + ', '
                            
                        })}    
                        </p>
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