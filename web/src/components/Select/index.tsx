import React, { SelectHTMLAttributes } from 'react'

import { Container } from './styled'


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: Array<{
        value: string
        label: string
    }>
}

const Select : React.FC<SelectProps> = ({ name, label, options, ...rest }) => {

    return (
        <Container>
            <label htmlFor={name}>
                {label}
            </label>
            
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </Container>
    )
}

export default Select