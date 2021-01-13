import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import Input from 'components/Input'
import Select from 'components/Select'
import { Button } from 'components/Button/styled'
import { DialogContent, Title } from './styled'


const OwnerForm = () => {
    const formRef = useRef<FormHandles>(null)

    return (
        <> 
            <Form ref={formRef} onSubmit={() => {}}>    
                <DialogContent>
                    <Title>Novo Proprietário</Title>

                    
                        <Input name="owner" label="Nome" />
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