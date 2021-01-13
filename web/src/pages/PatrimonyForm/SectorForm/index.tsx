import React, { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { DialogContent } from './styled'
import { Title } from '../OwnerForm/styled'
import Input from 'components/Input'
import { Button } from 'components/Button/styled'


const SectorForm = () => {
    
    const formRef = useRef<FormHandles>(null)

    return(
        <>
            <Form ref={formRef} onSubmit={() => {}}>
                <DialogContent>
                    <Title>Novo Setor</Title>

                    <Input name="sectors" label="Setor" />
                    <Button>
                        Salvar
                    </Button>                    
                </DialogContent>
            </Form>
        </>
    )
}

export default SectorForm