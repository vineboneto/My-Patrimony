import React, { forwardRef, memo, TextareaHTMLAttributes } from 'react'

import { Container } from './styled'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string
}

const Textarea: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = ({ name, label, ...rest }, ref) => {
    return (
        <Container>
            <label htmlFor={name}>{label}</label>
            <textarea 
                id={name}
                {...rest}
                ref={ref}
            />
        </Container>
    )
}

export default forwardRef(Textarea)