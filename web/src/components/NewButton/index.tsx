import React, { ButtonHTMLAttributes } from 'react'

import plusSector from '../../assets/images/icons/plusIcon.svg'

import './styles.css'

interface NewProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean
}

const NewButton: React.FC<NewProps> = ({ isOpen, ...rest }) => {
    
    return (
        <button className="new-block" {...rest}>
            <img src={plusSector} alt="Novo setor"/>
        </button>
    )
}

export default NewButton