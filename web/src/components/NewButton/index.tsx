import React, { ButtonHTMLAttributes, memo } from 'react'
import { Button } from './styled'

interface NewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const NewButton: React.FC<NewButtonProps> = ({ ...rest }) => {
    
    return (
        <Button {...rest}>
        </Button>
    )
}

export default memo(NewButton)