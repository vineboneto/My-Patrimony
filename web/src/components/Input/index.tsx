import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { InputBlock } from './styled'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
}

const Input: React.FC<InputProps> =({ name, label, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            path: 'value',
            ref: inputRef.current
        })
    }, [fieldName, registerField])

    return (
        <InputBlock>
            <label htmlFor={name}>{label}</label>
            <input 
                id={name} 
                ref={inputRef}
                defaultValue={defaultValue} 
                {...rest}
            />

            { error && <span>{error}</span> }
        </InputBlock>
    )
}

export default Input
