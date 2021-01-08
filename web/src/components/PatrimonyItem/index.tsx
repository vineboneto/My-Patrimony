import React from 'react'
import { Link } from 'react-router-dom'

import deleteForeverIcon from '../../assets/images/icons/deleteForeverIcon.svg'
import editIcon from '../../assets/images/icons/editIcon.svg'

import { Item, Header, Content, Info, Actions } from './styled'

export interface Patrimony {
    id: number
    model: string
    patrimony: string
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
        <Item>
            <Header>
                <h2>{patrimony.ownerName}</h2>
                <span>{patrimony.sectorName}</span>
            </Header>

            <Content>
                <Info>
                    <h3>{patrimony.typeName}</h3>
                    <p><span>Patrimônio:</span> {patrimony.patrimony}</p>
                    <p><span>Modelo:</span> {patrimony.model}</p>
                    {patrimony.ips &&    
                        <p><span>Ips: </span>
                            {patrimony.ips}
                        </p>
                    }
                </Info>

                <Actions>
                    <Link to="/">
                        <img src={deleteForeverIcon} alt="Excluir"/>
                    </Link>
                    <Link to={{
                        pathname: `/patrimony/edit/${patrimony.id}`
                    }}>

                        <img src={editIcon} alt="Editar"/>
                    </Link>
                </Actions>
            </Content>

        </Item>
    )
}

export default PatrimonyItem