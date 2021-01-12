import React from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'

import Input from 'components/Input'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import PageHeader from 'components/PageHeader'

import { Container, Main, Form as SForm, Legend, Fieldset, OwnerData, PatrimonyData, Footer, Button } from './styled'

const PatrimonyForm: React.FC = () => {
    const optionSector = [
        { value: '1', label: 'Compras' },
        { value: '2', label: 'Admin' }
    ]

    const optionCategory = [
        { value: '1', label: 'Computador' },
        { value: '2', label: 'Impressora' }
    ]

    return (
        <Container>
            <PageHeader title="Novo Patrimônio" prev="/" />

            <Main>
                <SForm onSubmit={() => { }}>

                    <Fieldset>
                        <Legend>Proprietário</Legend>
                        <OwnerData>
                            <Input name="owner" label="Proprietário" />
                            <Select name="sectors" label="Setor" options={optionSector} />
                        </OwnerData>
                    </Fieldset>

                    <Fieldset>
                        <Legend>Patrimônio</Legend>
                        <PatrimonyData>
                            <Select name="categories" label="Categoria" options={optionCategory} />
                            <Input name="patrimony"  label="Patrimônio" />
                            <Input name="model" label="Modelo" />
                            <Textarea name="description" label="Descrição" />
                        </PatrimonyData>
                    </Fieldset>
                </SForm>

                <Footer>
                    <Button>
                        Salvar
                    </Button>
                </Footer>
            </Main>
            

        </Container>
    )
}

export default PatrimonyForm