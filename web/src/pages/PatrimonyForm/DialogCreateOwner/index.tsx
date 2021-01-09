import React, { MouseEvent, useCallback, useEffect, useState } from 'react'


import Select from 'components/Select'
import NewButton from 'components/NewButton'
import Input from 'components/Input'
import Dialog from 'components/Dialog'
import DialogCreateSector from '../DialogCreateSector'


import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import * as SectorsActions from 'stores/ducks/sectors/action'
import * as OwnersActions from 'stores/ducks/owners/action'

import { OwnerData } from './styled'
import api from 'services/api'
import { loadCreate } from 'stores/ducks/owners/action'

const DialogCreateOwner: React.FC = () => {

    const [owner, setOwner] = useState('')
    const [sectorId, setSectorId] = useState('')

    const sectors = useSelector((state: ApplicationState) => state.sectors)
    const owners = useSelector((state: ApplicationState) => state.owners)
    const dispatch = useDispatch()

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()


        // api.post('owners', {
        //     name: owner,
        //     sector_id: parseInt(sectorId)
        // }).then(() => {
        //     alert('Proprietário Cadastrado')
            
        // }).catch(() => alert('Erro ao cadastrar proprietário'))
        dispatch(loadCreate('owners', { name: owner, sectorId: parseInt(sectorId) }))
        dispatch(OwnersActions.setDialogIsOpen(false))
        alert('Cadastrado com sucesso')

    }

    useEffect(() => {
        dispatch(SectorsActions.loadRequest('sectors'))
    }, [dispatch])

    const handleCloseDialogOwner = useCallback(() => {
        dispatch(OwnersActions.setDialogIsOpen(!owners.dialogIsOpen))
    }, [owners.dialogIsOpen, dispatch])

    const handleOpenDialogSector = useCallback((e: MouseEvent) => {
        e.preventDefault()
        dispatch(SectorsActions.setDialogIsOpen(!sectors.dialogIsOpen))
    }, [sectors.dialogIsOpen, dispatch])

    const handleSetOptions = useCallback(() => {
        const options = sectors.data.map((sector) => {
            return {
                value: sector.id.toString(),
                label: sector.name
            }
        })
        return options
    }, [sectors.data])

    return (
        <Dialog
            isOpen={owners.dialogIsOpen}
            closeDialog={handleCloseDialogOwner}
            labelButton="Salvar novo Proprietário"
            clickButton={handleCreateOwner}
        >
            <OwnerData>
                <Input
                    name="newOwner"
                    label="Novo Proprietário"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                />

                <DialogCreateSector />

                <NewButton onClick={handleOpenDialogSector}/>

                <Select
                    name="sectorDialog"
                    label="Setor"
                    value={sectorId}
                    options={handleSetOptions()} 
                    onChange={(e) => setSectorId(e.target.value)}
                />
            </OwnerData>
        </Dialog>
    )
}

export default DialogCreateOwner