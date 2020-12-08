import React, { SelectHTMLAttributes, useState } from 'react'

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
    onIsOpenClick?: Function
    isOpen?: boolean
}

const Select : React.FC<SelectProps> = ({ label, name, options, onIsOpenClick, isOpen, ...rest }) => {
    
    
    return (
        <div className="select-block">
            <label htmlFor={name}>
                {label}
                {isOpen !== undefined && onIsOpenClick !== undefined &&
                    <div className="plusSector">
                        <button 
                            className="plusSector"
                            onClick={(e) => {
                                e.preventDefault()
                                onIsOpenClick(true)
                            }}>
                                
                            <img src={plusIcon} alt="Novo Setor" />
                            
                        </button>
                        <Dialog 
                            isOpen={isOpen}
                            onClose={(isOpen: boolean) => onIsOpenClick(isOpen)} />
                    </div>
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