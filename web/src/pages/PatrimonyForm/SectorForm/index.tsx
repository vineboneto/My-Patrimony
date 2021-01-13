import React, { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Input'
import Button from 'components/Button'
import { DialogContainer, Title } from 'components/Dialog/styled'

import { DialogContent } from './styled'

const SectorForm = () => {
    
    const formRef = useRef<FormHandles>(null)

    return(
        <DialogContainer>
            <Form ref={formRef} onSubmit={() => {}}>
                <DialogContent>
                    <Title>Novo Setor</Title>

                    <Input name="sectors" label="Setor" />
                    <Button>
                        Salvar
                    </Button>                    
                </DialogContent>
            </Form>
        </DialogContainer>
    )
}

export default SectorForm