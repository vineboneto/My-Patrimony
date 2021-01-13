import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles, Scope } from '@unform/core'

import Input from 'components/Input'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import PageHeader from 'components/PageHeader'
import Collapse from '@material-ui/core/Collapse'
import Dialog from '@material-ui/core/Dialog'
import Button, { ButtonCollapse, Create, Plus } from 'components/Button'

import { Container, Main, OwnerData,
     PatrimonyData, Footer, IpData } from './styled'
import { Fieldset, Legend  } from 'components/Fieldset/styled'


import OwnerForm from './OwnerForm'
import plusIcon from 'assets/images/icons/plusIcon.svg'

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

const PatrimonyForm: React.FC = () => {
  
    const optionSector = [
        { value: 2, label: 'Compras' },
        { value: 3, label: 'Admin' }
    ]

    const optionCategory = [
        { value: 2, label: 'Computador' },
        { value: 3, label: 'Impressora' }
    ]

    const optionOwners = [
        { value: 2, label: 'Vinicius' },
        { value: 3, label: 'Weusley' }
    ]

    const DEFAULT_DATA = {
        sectors: { value: -1, label: 'Selecione' },
        categories: { value: -1, label: 'Selecione' },
        owners: { value: -1, label: 'Selecione' },
    }

    const [visible, setVisible] = useState(false)
    const handleOpenCollapse = useCallback(() => {
        setVisible(!visible)
    }, [visible])

    const formRef = useRef<FormHandles>(null)
    const handleSubmit: SubmitHandler<FormData> = useCallback((data) => {
        console.log(data)
    }, [])  

    const [openDialogCategory, setOpenDialogCategory] = useState(false)
    const handleOpenDialogCategory = useCallback(() => {
        setOpenDialogCategory(true)
    }, [])

    const handleCloseDialogCategory = useCallback(() => {
        setOpenDialogCategory(false)
    }, [])

    const [openDialogOwner, setOpenDialogOwner] = useState(false)
    const handleOpenDialogOwner = useCallback(() => {
        setOpenDialogOwner(true)
    }, [])

    const handleCloseDialogOwner = useCallback(() => {
        setOpenDialogOwner(false)
    }, [])

    return (
        <Container>

            <PageHeader title="Novo Patrimônio" prev="/" />

            <Main>
                <Form ref={formRef} onSubmit={handleSubmit} initialData={DEFAULT_DATA}>

                    <Fieldset>
                        <Legend>
                            Proprietário
                            <Create type="button" onClick={handleOpenDialogOwner}>
                                + Novo Proprietário
                            </Create>
                        </Legend>
                        <Dialog open={openDialogOwner} onClose={handleCloseDialogOwner}>
                            <OwnerForm />
                        </Dialog>
                        <OwnerData>
                            <Select name="owners" label="Proprietário" options={optionOwners} />
                            <Select name="sectors" label="Setor" options={optionSector} />
                        </OwnerData>
                    </Fieldset>

                    <Fieldset>
                        <Legend>Patrimônio</Legend>
                        <PatrimonyData>
                            
                            <Dialog open={openDialogCategory} onClose={handleCloseDialogCategory} aria-labelledby="form-dialog-title">
                            
                            </Dialog>

                            <Plus type="button" onClick={handleOpenDialogCategory}>
                                <img src={plusIcon} alt="Adicionar Categoria"/>
                            </Plus>
                            <Select name="categories" label="Categoria" options={optionCategory} />
                            <Input name="patrimony"  label="Patrimônio" />
                            <Input name="model" label="Modelo" />
                            <Textarea name="description" label="Descrição" />
                        </PatrimonyData>
                    </Fieldset>

                    
                    <ButtonCollapse type="button" onClick={handleOpenCollapse}>
                        {visible ? 'Fechar' : 'Adicionar Ips'}
                    </ButtonCollapse>
                    <Fieldset padding="0 3.4rem">
                        <Collapse in={visible}>
                            <Legend padding="3.4rem 0 0">
                                Ips
                                <Create>+ Novo Ip</Create>
                            </Legend>
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
                        <Button type="submit">
                            Salvar
                        </Button>
                    </Footer>
                    
                </Form>
            </Main>

        </Container>
    )
}

export default PatrimonyForm