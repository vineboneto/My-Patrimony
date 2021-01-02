import React, { MouseEvent } from 'react'

import closeDialog from '../../assets/images/icons/closeIcon.svg'

import './styles.css'

interface DialogProps {
    isOpen: boolean
    labelButton?: string
    onIsOpenChange: (isOpen: boolean) => void
    onClickButton?: (e: MouseEvent) => void
}

const Dialog: React.FC<DialogProps> = ({ children, isOpen, onIsOpenChange, labelButton, onClickButton }) => {
    return (
        
        <>
            {isOpen &&
            <div className="dialog-block" role="dialog" tabIndex={-1}>
                <div className="content">
                    <button onClick={() => onIsOpenChange(!isOpen)} className="close-button">
                        <img src={closeDialog} alt="Close"/>
                    </button>
                    {children}
                    
                    {labelButton && onClickButton &&
                    <button className="save-button" onClick={(e: MouseEvent) => onClickButton(e)}>
                        {labelButton}
                    </button>
                    }
                    
                </div> 
            </div>
            }
        </>
    )
}

export default Dialog