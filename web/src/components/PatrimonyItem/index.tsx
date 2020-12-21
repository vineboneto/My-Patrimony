import React from 'react'
import { Link } from 'react-router-dom'

import deleteForeverIcon from '../../assets/images/icons/deleteForeverIcon.svg'
import editIcon from '../../assets/images/icons/editIcon.svg'

import './styles.css'

const PatrimonyItem: React.FC = () => {
    return (
        <div className="patrimony-block">
            <div className="patrimony-header">
                <h2>Vinicius Gazolla Boneto</h2>
                <span>Administração</span>
            </div>

            <div className="patrimony-content">
                <div className="info">
                    <h3>Computador</h3>
                    <p><span>Patrimônio:</span> 65621</p>
                    <p><span>Modelo:</span> Concordia</p>
                    <p><span>Ips:</span> 192.168.1.25</p>
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