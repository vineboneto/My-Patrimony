import React, { useCallback, useState, MouseEvent } from 'react'

import Dialog from 'components/Dialog'
import Input from 'components/Input'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { loadCreate, setDialogIsOpen } from 'stores/ducks/categories/action'

const DialogCreateCategory = () => {
    
    const [category, setCategory] = useState('')
    
    const dialogIsOpen = useSelector((state: ApplicationState) => state.categories.dialogIsOpen)
    const dispatch = useDispatch()


    function handleCreateType(e: MouseEvent) {
        e.preventDefault()
        dispatch(setDialogIsOpen(false))
        dispatch(loadCreate('types', { name: category }))
    }
    
    const handleCloseDialogType = useCallback(() => {
        dispatch(setDialogIsOpen(false))
    }, [dispatch])

    
    return (
        <Dialog
            isOpen={dialogIsOpen}
            closeDialog={handleCloseDialogType}
            labelButton="Salvar nova Categoria"
            clickButton={handleCreateType}
        >
            <Input
                name="category"
                label="Nova Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </Dialog>
    )
}

export default DialogCreateCategory