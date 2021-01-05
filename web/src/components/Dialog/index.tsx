import React, { MouseEvent } from 'react'

import closeDialog from '../../assets/images/icons/closeIcon.svg'

import { DialogContainer, Content, ButtonSave, ButtonClose } from './styled'

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
            <DialogContainer role="dialog" tabIndex={-1}>
                <Content>
                    <ButtonClose onClick={() => onIsOpenChange(!isOpen)}>              
                        <img src={closeDialog} alt="Close"/>
                    </ButtonClose>
                    {children}
                    
                    {labelButton && onClickButton &&
                        <ButtonSave onClick={(e: MouseEvent) => onClickButton(e)}>
                            {labelButton}
                        </ButtonSave>
                    }
                    
                </Content>

            </DialogContainer>
            }
        </>
    )
}

export default Dialog