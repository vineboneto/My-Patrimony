import React, { SelectHTMLAttributes } from 'react'

import PlusItem from '../PlusItem'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string
    label: string
    options: Array<{
        value: string
        label: string
    }>
    isOpen?: boolean
    onIsOpenClick?: Function
}

const Select : React.FC<SelectProps> = ({ isOpen, name, label, options, onIsOpenClick, ...rest }) => {

    return (
        <div className="select-block" >
            <label htmlFor={name}>
                {label}
                {isOpen !== undefined && onIsOpenClick !== undefined &&
                    <PlusItem
                        isOpen={isOpen}
                        onIsOpenClick={(isOpen: boolean) => onIsOpenClick(isOpen)} />
                }
            </label>
            
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione o setor</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default Select