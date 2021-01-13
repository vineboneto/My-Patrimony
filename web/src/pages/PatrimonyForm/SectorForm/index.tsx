import React, { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Input'
import Button from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'

import { Content } from './styled'

const SectorForm = () => {
    
    const formRef = useRef<FormHandles>(null)

    return(
        <DialogContainer>
            <Form ref={formRef} onSubmit={() => {}}>
                <Content>
                    <Title>Novo Setor</Title>

                    <Input name="sectors" label="Setor" />
                    <Button>
                        Salvar
                    </Button>                    
                </Content>
            </Form>
        </DialogContainer>
    )
}

export default SectorForm