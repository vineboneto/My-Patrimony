import React, { InputHTMLAttributes } from 'react'

import { Container } from './styled'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
}

const Input: React.FC<InputProps> =({ label, name, ...rest }) => {
    return (
        
        <Container>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </Container>
    );
}

export default Input
