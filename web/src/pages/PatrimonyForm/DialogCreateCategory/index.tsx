import React, { useCallback, useState, MouseEvent } from 'react'

import Dialog from 'components/Dialog'
import Input from 'components/Input'
import api from 'services/api'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { setDialogIsOpen } from 'stores/ducks/categories/action'

const DialogCreateCategory = () => {
    
    const [type, setType] = useState('')
    
    const dialogIsOpen = useSelector((state: ApplicationState) => state.categories.dialogIsOpen)
    const dispatch = useDispatch()


    async function handleCreateType(e: MouseEvent) {
        e.preventDefault()

        api.post('types', {
            name: type
        }).then(() => {
            alert('Tipo Cadastrado')
            dispatch(setDialogIsOpen(false))
        }).catch(() => alert('Erro ao cadastrar Tipo'))
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
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
        </Dialog>
    )
}

export default DialogCreateCategory