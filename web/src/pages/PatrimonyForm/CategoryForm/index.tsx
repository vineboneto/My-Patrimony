import React, { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Input'
import Button from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'

import { Content } from '../SectorForm/styled'

const CategoryForm = () => {
    
    const formRef = useRef<FormHandles>(null)

    return(
        <DialogContainer>
            <Form ref={formRef} onSubmit={() => {}}>
                <Content>
                    <Title>Nova Categoria</Title>

                    <Input name="category" label="Categoria" />
                    <Button type="button">
                        Salvar
                    </Button>                    
                </Content>
            </Form>
        </DialogContainer>
    )
}

export default CategoryForm