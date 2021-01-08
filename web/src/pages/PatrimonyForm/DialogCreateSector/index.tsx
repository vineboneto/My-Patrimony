import React, { MouseEvent, useEffect, useState } from 'react'

import Input from 'components/Input';
import Dialog from 'components/Dialog';
import api from 'services/api';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'stores';
import { setDialogIsOpen } from 'stores/ducks/sectors/action';

const DialogCreateSector: React.FC = () => {
    
    const [sector, setSector] = useState('')

    
    const isOpen = useSelector((state: ApplicationState) => state.sectors.dialogIsOpen)
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
    
    return (

        <Dialog 
            labelButton="Salvar novo setor"
            onClickButton={(e) => handleCreateSector(e)}
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