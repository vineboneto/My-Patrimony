import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Dialog } from '@material-ui/core'
import Input from 'components/Input'
import Select from 'components/Select'
import Button, { Plus } from 'components/Button'
import { DialogContainer, Title } from 'components/Dialog/styled'
import { DialogContent } from './styled'

import plusIcon from 'assets/images/icons/plusIcon.svg'
import SectorForm from '../SectorForm'

const OwnerForm = () => {
    const formRef = useRef<FormHandles>(null)

    const [open, setOpen] = useState(false)
    const handleCloseDialog = useCallback(() => {
        setOpen(false)
    }, [])

    const handleOpenDialog = useCallback(() => {
        setOpen(true)
    }, [])

    return (
        <DialogContainer> 
            <Form ref={formRef} onSubmit={() => {}}>    
                <DialogContent>
                    <Title>Novo Proprietário</Title>

                    
                    <Input name="owner" label="Nome" />

                    <Plus onClick={handleOpenDialog}>
                        <img src={plusIcon} alt="Adicionar Setor"/>
                    </Plus>
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <SectorForm />
                    </Dialog>
                    <Select name="sectors" label="Setor" />
                    
                    <Button>
                        Salvar
                    </Button>
                </DialogContent>
            </Form> 
        </DialogContainer>
    )
}

export default OwnerForm