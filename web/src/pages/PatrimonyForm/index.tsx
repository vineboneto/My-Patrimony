import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import IpItems from '../../components/IpItem'
import Form from '../../components/Form'
import Main from '../../components/Main'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Footer from '../../components/Footer'
import Collapse from '../../components/Collapse'
import Dialog from '../../components/Dialog'
import NewButton from '../../components/NewButton'

import api from '../../services/api'

import { Container, Patrimony, DialogOwner, Owner, ButtonCollapse, ButtonFooter } from './styled'

interface Params {
    id: string
}

const PatrimonyForm: React.FC = () => {
    
    const { id }  = useParams<Params>()
    const [sectorId, setSectorId] = useState('')
    const [ownerId, setOwnerId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    
    // State's of selects
    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    const [optionsTypes, setOptionsTypes] = useState([
        { value: '', label: '' }
    ])
    
    const [ipItems, setIpItems] = useState([
        { id: '', ip: '', mask: '', gateway: '' }
    ])
    // State's of dialogs
    const [sectorIdDialog, setSectorIdDialog] = useState('')
    const [sectorDialog, setSectorDialog] = useState('')
    const [ownerDialog, setOwnerDialog] = useState('')
    const [typeDialog, setTypeDialog] = useState('')
    // Open Dialogs and Collapses
    const [isOpenOwner, setIsOpenOwner] = useState(false)
    const [isOpenSector, setIsOpenSector] = useState(false)
    const [isOpenIp, setIsOpenIp] = useState(false)
    const [isOpenType, setIsOpenType] = useState(false)


    useEffect(() => {
        getDataOwner()
        getDataSector()
        getDataTypes()
        // Se não possui id não carrega nenhum dado 
        if (id) {
            loadDataPatrimony()
        }
        // eslint-disable-next-line
    }, [isOpenSector, isOpenOwner, isOpenType])


    async function loadDataPatrimony() {
        const response = await api.get(`patrimonies/${id}`)
        const data = response.data[0]
        setOwnerId(data.owner_id.toString())
        setSectorId(data.sector_id.toString())
        setTypeId(data.type_id)
        setPatrimony(data.patrimony)
        setModel(data.model)
        setDescription(data.description)
        if (data.ips[0][0]) {
            const ips = data.ips.map((ip: any) => { 
                return {
                    id: ip[0],
                    ip: ip[1],
                    mask: ip[2],
                    gateway: ip[3]
                }
            })
            setIpItems(ips)
        }
    }

    async function getDataOwner() {
        const response = await api.get('owners')
        const datas = response.data
        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name,
                sectorId: data.sector_id
            }
        })
        setOptionsOwner(options)
    }

    async function getDataSector() {
        const response =  await api.get('sectors')
        const datas = response.data
        
        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOptionsSector(options)
    }

    async function getDataTypes() {
        const response = await api.get('types')
        const datas = response.data

        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOptionsTypes(options)
    }
    
    const handleSelectOwner = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOwnerId(e.target.value)
        
        optionsOwner.forEach((owner, index) => {
            if (parseInt(owner.value) === parseInt(e.target.value)) {
                setSectorId(owner.sectorId)
            }
        })
    }


    async function handleCreatePatrimony(e: MouseEvent) {
        e.preventDefault()
        api.post('patrimonies', {
            patrimony: patrimony,
            model: model,
            description: description,
            owner_id: parseInt(ownerId),
            type_id: parseInt(typeId),
            ips: ipItems
        })
        .then(() => alert('Patrimônio cadastrado com sucesso'))
        .catch(() => alert('Erro ao cadastrar Patrimônio'))
    }

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()

        api.post('owners', {
            name: ownerDialog,
            sector_id: parseInt(sectorIdDialog)
        }).then(() => {
            alert('Proprietário Cadastrado')
            setIsOpenOwner(false)
        }).catch(() => alert('Erro ao cadastrar proprietário'))

    }
    
    async function handleCreateSector(e: MouseEvent) {
        e.preventDefault()

        api.post('sectors', {
            name: sectorDialog
        }).then(() => {
            alert('Setor Cadastrado')
            setIsOpenSector(false)
        }).catch(() => alert('Erro ao cadastrar Setor'))

    }

    async function handleCreateType(e: MouseEvent) {
        e.preventDefault()

        api.post('types', {
            name: typeDialog
        }).then(() => {
            alert('Tipo Cadastrado')
            setIsOpenType(false)
        }).catch(() => alert('Erro ao cadastrar Tipo'))
    }

    function setIpItemsValue(position: Number, field: string, value: string) {
        const updateIpItems = ipItems.map((ipItem, index) => {
            if (index === position) {
                return { ...ipItem, [field]: value }
            }
            return ipItem
        })
        setIpItems(updateIpItems)
    }

    const addNewIpItem = () => {
        setIpItems([
            ...ipItems,
            { id: '', ip: '', mask: '', gateway: '' }
        ])
    }
    

    return (
        <Container>
            <PageHeader
                title="Novo Patrimônio"
                linkPrev="/" />

                <Main>
                    <Form
                        addButton={() => setIsOpenOwner(!isOpenOwner)}
                        labelButton="+ Novo Proprietário"
                        legend="Proprietário">
                        
                        <Dialog 
                            isOpen={isOpenOwner}
                            onIsOpenChange={(isOpen: boolean) => setIsOpenOwner(isOpen)}
                            labelButton="Salvar novo Proprietário"
                            onClickButton={(e) => handleCreateOwner(e)}
                        >
                            <DialogOwner>
                                <Input
                                    name="newOwner"
                                    label="Novo Proprietário"
                                    value={ownerDialog}
                                    onChange={(e) => setOwnerDialog(e.target.value)}
                                />

                                <NewButton onClick={(e) => { e.preventDefault()
                                        setIsOpenSector(!isOpenSector)}} />
                                
                                <Dialog 
                                    isOpen={isOpenSector}
                                    onIsOpenChange={(isOpen: boolean) => setIsOpenSector(isOpen)}
                                    labelButton="Salvar novo setor"
                                    onClickButton={(e) => handleCreateSector(e)}
                                >
                                    <Input
                                        name="newSector"
                                        label="Novo Setor"
                                        value={sectorDialog}
                                        onChange={(e) => setSectorDialog(e.target.value)}
                                    />
                                </Dialog>

                                <Select
                                  name="sectorDialog"
                                  label="Setor"
                                  value={sectorIdDialog}
                                  options={optionsSector} 
                                  onChange={(e) => setSectorIdDialog(e.target.value)}
                                />
                            </DialogOwner>
                        </Dialog>


                        <Owner>
                            <Select
                                name="owner"
                                label="Proprietário"
                                options={optionsOwner}
                                value={ownerId}
                                onChange={handleSelectOwner}
                            />

                            <Select
                                name="sector"
                                label="Setor"
                                options={optionsSector}
                                value={sectorId}
                                onChange={(e) => setSectorId(e.target.value)}
                                disabled={true} 
                            />
                        </Owner>
                    </Form>

                    <Form legend="Patrimônio">
                        
                        <Patrimony>
                            <div>
                            <Dialog
                                isOpen={isOpenType}
                                onIsOpenChange={(isOpen: boolean) => setIsOpenType(isOpen)}
                                labelButton="Salvar novo tipo"
                                onClickButton={(e) => handleCreateType(e)}
                                >
                                <Input
                                    name="typeDialog"
                                    label="Novo Tipo"
                                    value={typeDialog}
                                    onChange={(e) => setTypeDialog(e.target.value)}
                                />
                            </Dialog>
                            </div>
                            
                            
                            <NewButton
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpenType(!isOpenType)
                                }}
                            />
                            
                            <Select
                                name="type"
                                label="Tipo"
                                options={optionsTypes}
                                value={typeId}
                                onChange={(e) => setTypeId(e.target.value)}
                            />

                            <Input
                                name="patrimony"
                                label="Patrimônio"
                                value={patrimony}
                                onChange={(e) => setPatrimony(e.target.value)}
                            />

                            <Input
                                name="model"
                                label="Modelo"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                            <Textarea
                                name="description"
                                label="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Patrimony>

                    </Form>
                   
                    <ButtonCollapse onClick={(e) => setIsOpenIp(!isOpenIp)}>
                        Adicionar Ip
                    </ButtonCollapse>
                    <Collapse isOpen={isOpenIp}>
                        <Form 
                            legend="Ips"
                            addButton={addNewIpItem}
                            labelButton="+ Novo Ip">

                            
                            
                            {ipItems.map((ipItem, index) => {
                                return (
                                    <IpItems
                                        key={index}
                                        ipItem={ipItem}
                                        onIpChange={(ipValue: string) => setIpItemsValue(index, 'ip', ipValue) }
                                        onMaskChange={(maskValue: string) => setIpItemsValue(index, 'mask', maskValue)} 
                                        onGatewayChange={(gatewayValue: string) => setIpItemsValue(index, 'gateway', gatewayValue)} />
                                )
                            })}
                            
                        </Form>
                    </Collapse>
                    
                    <Footer>
                        <ButtonFooter onClick={handleCreatePatrimony}>
                            Salvar Patrimônio
                        </ButtonFooter>
                    </Footer>   
                    
                </Main>
        </Container>
    )
}

export default PatrimonyForm