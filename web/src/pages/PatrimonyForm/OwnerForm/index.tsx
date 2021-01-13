import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Dialog } from '@material-ui/core'
import Input from 'components/Input'
import Select from 'components/Select'
import Button, { Plus } from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'
import { Content } from './styled'

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
                <Content>
                    
                    <Title>Novo Proprietário</Title>
                    
                    <Input name="owner" label="Nome" />

                        
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <SectorForm />
                    </Dialog>

                    <Plus type="button" onClick={handleOpenDialog} />
                    <Select name="sectors" label="Setor" />
                
                    <Button>
                        Salvar
                    </Button>
                </Content>
            </Form> 
        </DialogContainer>
    )
}

export default OwnerForm