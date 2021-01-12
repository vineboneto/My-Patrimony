import React, { useCallback, useState } from 'react'
import { SubmitHandler, FormHandles, Scope } from '@unform/core'
import Collapse from '@material-ui/core/Collapse'

import Input from 'components/Input'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import PageHeader from 'components/PageHeader'

import { Container, Main, Form as SForm, Legend, Fieldset, OwnerData,
     PatrimonyData, Footer, Button, ButtonCollapse, IpData } from './styled'


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

                    
                    <ButtonCollapse onClick={handleOpenCollapse}>{visible ? 'Fechar' : 'Adicionar Ips'}</ButtonCollapse>
                    <Fieldset>
                        <Collapse in={visible}>
                            <IpData>
                                <Scope path="patrimony">
                                    <Input name="ip" label="Ip" placeholder="192.168.1.55" />
                                    <Input name="mask" label="Máscara de sub-rede" placeholder="255.255.255.0" />
                                    <Input name="gateway" label="Gateway" placeholder="192.168.1.1" />
                                </Scope>
                            </IpData>
                        </Collapse>
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