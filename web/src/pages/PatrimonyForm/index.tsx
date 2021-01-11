import React from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'

import Input from 'components/Input'
import PageHeader from 'components/PageHeader'

import { Container, Main, Form as SForm, Legend, Fieldset, OwnerData } from './styled'
import Select from 'components/Select'

const PatrimonyForm: React.FC = () => {
    return (
        <Container>
            <PageHeader title="Novo Patrimônio" prev="/" />

            <Main>
                <SForm onSubmit={() => {}}>
                    
                    <Fieldset>
                        <Legend>Proprietário</Legend>
                        <OwnerData>
                            <Input name="owner" label="Proprietário" />
                            <Select name="sectors" label="Setor" options={[ { value: '1', label: 'Compras' }, { value: '2', label: 'Admin' } ]} />
                        </OwnerData>
                    </Fieldset>
                </SForm>
            </Main>
            

        </Container>
    )
}

export default PatrimonyForm