import React, { MouseEvent, useEffect, useState } from 'react'

import { DialogOwner } from './styled'

import Select from 'components/Select'
import NewButton from 'components/NewButton'
import Input from 'components/Input'
import Dialog from 'components/Dialog'

import api from 'services/api'
import DialogCreateSector from '../DialogCreateSector'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import { setDialogIsOpen } from 'stores/ducks/sectors/action'

const DialogCreateOwner: React.FC = () => {

    const [owner, setOwner] = useState('')
    const [sectorId, setSectorId] = useState('')
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])

    const [isOpen, setIsOpen] = useState(true)

    const sectors = useSelector((state: ApplicationState) => state.sectors)
    const owners = useSelector((state: ApplicationState) => state.owners)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getDataSector() {
            const response =  await api.get('sectors')
            const datas = response.data
            
            const options = datas.map((data: any) => {
                return {
                    value: data.id,
                    label: data.name
                }
            })
            setOptionsSector(options)
        }
        getDataSector()
    }, [])

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()

        api.post('owners', {
            name: owner,
            sector_id: parseInt(sectorId)
        }).then(() => {
            alert('Proprietário Cadastrado')
            setIsOpen(false)
        }).catch(() => alert('Erro ao cadastrar proprietário'))

    }

    const handleOpenDialog = () => {
        dispatch(setDialogIsOpen(!sectors.dialogIsOpen))
    }

    

    return (
        <>
        {owners.dialogIsOpen &&
            <Dialog
                labelButton="Salvar novo Proprietário"
                onClickButton={(e: MouseEvent) => handleCreateOwner(e)}
            >
                <DialogOwner>
                    <Input
                        name="newOwner"
                        label="Novo Proprietário"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />

                    <NewButton onClick={handleOpenDialog}/>


                    <DialogCreateSector />
                    
                    <Select
                        name="sectorDialog"
                        label="Setor"
                        value={sectorId}
                        options={optionsSector} 
                        onChange={(e) => setSectorId(e.target.value)}
                    />
                </DialogOwner>
            </Dialog>
        }
        </>
    )
}

export default DialogCreateOwner