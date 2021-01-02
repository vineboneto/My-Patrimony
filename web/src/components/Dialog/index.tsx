import React from 'react'

import closeDialog from '../../assets/images/icons/closeIcon.svg'

import './styles.css'

interface DialogProps {
    isOpen: boolean
    labelButton?: string
    onIsOpenChange: (isOpen: boolean) => void
}

const Dialog: React.FC<DialogProps> = ({ children, isOpen, onIsOpenChange, labelButton }) => {
    return (
        
        <>
            {isOpen &&
            <div className="dialog-block" role="dialog" tabIndex={-1}>
                <div className="content">
                    <button onClick={() => onIsOpenChange(!isOpen)}>
                        <img src={closeDialog} alt="Close"/>
                    </button>
                    {children}
                    
                    {labelButton &&
                    <button className="dialog-button">
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