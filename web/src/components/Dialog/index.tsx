import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { setDialogIsOpen } from 'stores/ducks/sectors/action'

import closeDialog from '../../assets/images/icons/closeIcon.svg'

import { DialogContainer, Content, ButtonSave, ButtonClose } from './styled'

interface DialogProps {
    labelButton?: string
    onClickButton?: (e: MouseEvent) => void
}

const Dialog: React.FC<DialogProps> = ({ children, labelButton, onClickButton }) => {
    const isOpen = useSelector((state: ApplicationState) => state.sectors.dialogIsOpen)
    const dispatch = useDispatch()

    const handleCloseDialog = () => {
        dispatch(setDialogIsOpen(false))
    }
    
    return (
        <>
            {isOpen &&
            <DialogContainer role="dialog" tabIndex={-1}>
                <Content>
                    <ButtonClose onClick={handleCloseDialog}>              
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