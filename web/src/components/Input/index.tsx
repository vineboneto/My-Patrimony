import React, { InputHTMLAttributes, forwardRef } from 'react'

import { Container } from './styled'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ label, name, ...rest }, ref) => {
    return (

        <Container>
            <label htmlFor={name}>{label}</label>
            <input 
                type="text" 
                id={name}
                ref={ref} 
                {...rest}
            />

        </Container>
    );
}

export default forwardRef(Input)
