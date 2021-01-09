import React, { MouseEvent, useCallback } from 'react'

import closeIcon from '../../assets/images/icons/closeIcon.svg'

import { DialogContainer, Content, ButtonSave, ButtonClose, Container } from './styled'


interface DialogProps {
    isOpen: boolean
    closeDialog: () => void
    clickButton?: (e: MouseEvent) => void
    labelButton?: string
}

const Dialog: React.FC<DialogProps> = ({ children, isOpen, labelButton, clickButton, closeDialog }) => {


    return (
        <Container>
            { isOpen &&  
                <DialogContainer role="dialog" tabIndex={-1}>
                    <Content>
                        <ButtonClose onClick={closeDialog}>              
                            <img src={closeIcon} alt="Close"/>
                        </ButtonClose>
                        {children}
                        
                        {labelButton && clickButton &&
                            <ButtonSave onClick={clickButton}>
                                {labelButton}
                            </ButtonSave>
                        }   
                        
                    </Content>
                </DialogContainer>
            }
        </Container>
    )
}

export default Dialog