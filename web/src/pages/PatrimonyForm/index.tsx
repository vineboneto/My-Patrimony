import React, { useCallback, useRef, useState } from 'react'
import { SubmitHandler, FormHandles, Scope } from '@unform/core'
import Collapse from '@material-ui/core/Collapse'

import Input from 'components/Input'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import PageHeader from 'components/PageHeader'

import { Container, Main, Form as SForm, Legend, Fieldset, OwnerData,
     PatrimonyData, Footer, Button, ButtonCollapse, IpData } from './styled'

interface FormData {
    patrimony: string
    model: string
    description: string
    categoryId: string
    ownerId: string
    sectorId: string
    ips: [
        { id: number, ip: string, mask: string, gateway: string }
    ]
}

const PatrimonyForm: React.FC = (props) => {
  
    const optionSector = [
        { value: '1', label: 'Compras' },
        { value: '2', label: 'Admin' }
    ]

    const optionCategory = [
        { value: '1', label: 'Computador' },
        { value: '2', label: 'Impressora' }
    ]

    const [visible, setVisible] = useState(false)
    const handleOpenCollapse = useCallback(() => {
        setVisible(!visible)
    }, [visible])

    const formRef = useRef<FormHandles>(null)
    const handleSubmit: SubmitHandler<FormData> = useCallback((data) => {
        console.log(data)
    }, [])  


    return (
        <Container>
            <PageHeader title="Novo Patrimônio" prev="/" />

            <Main>
                <SForm ref={formRef} onSubmit={handleSubmit}>

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

                    
                    <ButtonCollapse onClick={handleOpenCollapse}>{visible ? 'Fechar' : 'Adicionar Ips'}</ButtonCollapse>
                    <Fieldset padding="0 3.4rem">
                        <Collapse in={visible}>
                        <Legend padding="3.4rem 0 0">Ips</Legend>
                            <IpData>
                                <Scope path={"ips"}>
                                    <Input name="ip" label="Ip" placeholder="192.168.1.55" />
                                    <Input name="mask" label="Máscara de sub-rede" placeholder="255.255.255.0" />
                                    <Input name="gateway" label="Gateway" placeholder="192.168.1.1" />
                                </Scope>
                            </IpData>
                        </Collapse>
                    </Fieldset>

                    <Footer>
                        <Button>
                            Salvar
                        </Button>
                    </Footer>
                    
                </SForm>
            </Main>
            

        </Container>
    )
}

export default PatrimonyForm