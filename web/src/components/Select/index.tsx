import React, { SelectHTMLAttributes } from 'react'

import Dialog from '../Dialog'

import plusIcon from '../../assets/images/icons/plusIcon.svg'

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

const Select : React.FC<SelectProps> = ({ label, name, options, isOpen, onIsOpenClick, ...rest }) => {
    
    return (
        <div className="select-block">
            <label htmlFor={name}>
                {label}
                
                {isOpen !== undefined && onIsOpenClick !== undefined &&
                <button className="plusSector" onClick={(e) => {
                    e.preventDefault() 
                    onIsOpenClick(!isOpen) }}
                >
                    <img src={plusIcon} alt="Novo Setor" />
                    <Dialog isOpen={isOpen} />
                </button>}
                
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