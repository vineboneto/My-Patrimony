import React, { ButtonHTMLAttributes, memo } from 'react'

import plusIcon from '../../assets/images/icons/plusIcon.svg'

import { Button } from './styled'

interface NewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const NewButton: React.FC<NewButtonProps> = ({ ...rest }) => {
    
    return (
        <Button {...rest}>
            <img src={plusIcon} alt="Novo setor"/>
        </Button>
    )
}

export default memo(NewButton)