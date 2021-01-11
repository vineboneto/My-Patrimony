import React from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from 'components/Input'
import PageHeader from 'components/PageHeader'

import { Container, Main, Form as SForm, Legend } from './styled'

const PatrimonyForm: React.FC = () => {
    return (
        <Container>
            <PageHeader title="Novo Patrimônio" prev="/" />

            <Main>
                <SForm onSubmit={() => {}}>
                    <Legend>Proprietário</Legend>
                    <Input name="owner" label="Proprietário" />
                </SForm>
            </Main>

        </Container>
    )
}

export default PatrimonyForm