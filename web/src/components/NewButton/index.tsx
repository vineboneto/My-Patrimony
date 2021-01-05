import React, { ButtonHTMLAttributes } from 'react'

import plusSector from '../../assets/images/icons/plusIcon.svg'

import { Button } from './styled'

interface NewProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean
}

const NewButton: React.FC<NewProps> = ({ isOpen, ...rest }) => {
    
    return (
        <Button {...rest}>
            <img src={plusSector} alt="Novo setor"/>
        </Button>
    )
}

export default NewButton