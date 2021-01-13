import React, { ButtonHTMLAttributes } from 'react'
import { SButton, SPlus, SButtonCollapse, SCreate } from './styled'

import plusIcon from 'assets/images/icons/plusIcon.svg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <SButton {...rest}>
            {children}
        </SButton>
    )
} 

export const Plus: React.FC<ButtonProps> = ({ ...rest }) => {
    return (
        <SPlus { ...rest }>
            <img src={plusIcon} alt=""/>
        </SPlus>
    )
}

export const ButtonCollapse: React.FC<ButtonProps> = ({ children }) => {
    return (
        <SButtonCollapse>
            {children}
        </SButtonCollapse>
    )
}

export const Create: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <SCreate { ...rest }>
            { children }
        </SCreate>
    )
}

export default Button



