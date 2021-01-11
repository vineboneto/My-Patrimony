import React, { useCallback, MouseEvent, useRef } from 'react'

import Dialog from 'components/Dialog'
import Input from 'components/Input'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { loadCreate, setDialogIsOpen } from 'stores/ducks/categories/action'

const DialogCreateCategory = () => {
    
    const categoryInputRef = useRef<HTMLInputElement>(null)
    
    const categories = useSelector((state: ApplicationState) => state.categories)
    const dispatch = useDispatch()


    function handleCreateType(e: MouseEvent) {
        e.preventDefault()
        dispatch(loadCreate('types', { name: categoryInputRef.toString() }))
        categories.error ? alert ('Erro ao realizar cadastro') : alert('Cadastrado com sucesso')
        dispatch(setDialogIsOpen(false))

    }
    
    const handleCloseDialogType = useCallback(() => {
        dispatch(setDialogIsOpen(false))
    }, [dispatch])

    
    return (
        <Dialog
            isOpen={categories.dialogIsOpen}
            closeDialog={handleCloseDialogType}
            labelButton="Salvar nova Categoria"
            clickButton={handleCreateType}
        >
            <Input
                name="category"
                label="Nova Categoria"
                ref={categoryInputRef}
            />
        </Dialog>
    )
}

export default DialogCreateCategory