import React, { useCallback, useState, MouseEvent } from 'react'

import Dialog from 'components/Dialog'
import Input from 'components/Input'
// import api from 'services/api'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { loadCreate, setDialogIsOpen } from 'stores/ducks/categories/action'

const DialogCreateCategory = () => {
    
    const [category, setCategory] = useState('')
    
    const dialogIsOpen = useSelector((state: ApplicationState) => state.categories.dialogIsOpen)
    const dispatch = useDispatch()


    function handleCreateType(e: MouseEvent) {
        e.preventDefault()

        // api.post('types', {
        //     name: category
        // }).then(() => {
        //     alert('Tipo Cadastrado')
        // }).catch(() => alert('Erro ao cadastrar Tipo'))
        
        dispatch(setDialogIsOpen(false))
        dispatch(loadCreate('types', { name: category }))
        alert('Cadastrado com sucesso!')
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