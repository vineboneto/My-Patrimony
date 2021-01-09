import React, { MouseEvent, useCallback, useState } from 'react'

import Input from 'components/Input';
import Dialog from 'components/Dialog';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'stores';
import { setDialogIsOpen } from 'stores/ducks/sectors/action';

import api from 'services/api';

const DialogCreateSector: React.FC = () => {
    
    const [sector, setSector] = useState('')

    
    const sectors = useSelector((state: ApplicationState) => state.sectors)
    const dispatch = useDispatch()

    async function handleCreateSector(e: MouseEvent) {
        e.preventDefault()

        api.post('sectors', {
            name: sector
        }).then(() => {
            alert('Setor Cadastrado')
            dispatch(setDialogIsOpen(false))
        }).catch(() => alert('Erro ao cadastrar Setor'))

    }

    const handleCloseDialog = useCallback(() => {
        dispatch(setDialogIsOpen(false))
    }, [dispatch])
    
    return (   
            <Dialog
                isOpen={sectors.dialogIsOpen}
                closeDialog={handleCloseDialog}
                labelButton="Salvar novo setor"
                clickButton={handleCreateSector}
            >
                <Input
                    name="newSector"
                    label="Novo Setor"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                />
            </Dialog>
    )
}

export default DialogCreateSector