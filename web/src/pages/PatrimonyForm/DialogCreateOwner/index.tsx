import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'


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

const DialogCreateOwner: React.FC = () => {

    const ownerInputRef = useRef<HTMLInputElement>(null)
    const [sectorIdSelectState, setSectorIdSelectState] = useState('')

    const sectors = useSelector((state: ApplicationState) => state.sectors)
    const owners = useSelector((state: ApplicationState) => state.owners)
    const dispatch = useDispatch()

    function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()
        dispatch(OwnersActions.loadCreate('owners',
            { name: ownerInputRef.toString(), sectorId: parseInt(sectorIdSelectState) }))
        dispatch(OwnersActions.setDialogIsOpen(false))
        owners.error ? alert('Erro ao cadastrar') : alert('Cadastrado com sucesso')
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
                value: sector.id?.toString() || '',
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
                    ref={ownerInputRef}
                />

                <DialogCreateSector />

                <NewButton onClick={handleOpenDialogSector} />

                <Select
                    name="sectorDialog"
                    label="Setor"
                    value={sectorIdSelectState}
                    options={handleSetOptions()}
                    onChange={(e) => setSectorIdSelectState(e.target.value)}
                />
            </OwnerData>
        </Dialog>
    )
}

export default DialogCreateOwner