import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import Input from 'components/Input'
import Select from 'components/Select'
import { Button, Plus } from 'components/Button/styled'
import { DialogContent, Title } from './styled'

import plusIcon from 'assets/images/icons/plusIcon.svg'
import { Dialog } from '@material-ui/core'
import { DialogContainer } from '../styled'
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
        <> 
            <Form ref={formRef} onSubmit={() => {}}>    
                <DialogContent>
                    <Title>Novo Proprietário</Title>

                    
                    <Input name="owner" label="Nome" />

                    <Plus onClick={handleOpenDialog}>
                        <img src={plusIcon} alt="Adicionar Setor"/>
                    </Plus>
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <DialogContainer>
                            <SectorForm />
                        </DialogContainer>
                    </Dialog>
                    <Select name="sectors" label="Setor" />
                    
                    <Button>
                        Salvar
                    </Button>
                </DialogContent>
            </Form> 
        </>
    )
}

export default OwnerForm