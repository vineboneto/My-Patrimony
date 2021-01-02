import React, { MouseEvent, useEffect, useState } from 'react'


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

import './styles.css'

const PatrimonyForm: React.FC = () => {

    const [sectorId, setSectorId] = useState('')
    const [ownerId, setOwnerId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    
    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])
    
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
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
    }, [isOpenSector, isOpenOwner, isOpenType])

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


    async function handleCreatePatrimony(e: MouseEvent) {
        e.preventDefault()
    }

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()

        api.post('/owners', {
            name: ownerDialog,
            sector_id: parseInt(sectorIdDialog)
        }).then(() => {
            alert('Proprietário Cadastrado')
            setIsOpenOwner(false)
        }).catch(() => alert('Erro ao cadastrar proprietário'))

    }
    
    async function handleCreateSector(e: MouseEvent) {
        e.preventDefault()

        api.post('/sectors', {
            name: sectorDialog
        }).then(() => {
            alert('Setor Cadastrado')
            setIsOpenSector(false)
        }).catch(() => alert('Erro ao cadastrar Setor'))

    }

    async function handleCreateType(e: MouseEvent) {
        e.preventDefault()

        api.post('/types', {
            name: typeDialog
        }).then(() => {
            alert('Tipo Cadastrado')
        }).catch(() => alert('Erro ao cadastrar Tipo'))
    }

    const setIpItemsValue = (position: Number, field: string, value: string) => {
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
            { ip: '', mask: '', gateway: '' }
        ])
    }

    return (
        <div id="page-patrimony-form">
            <PageHeader
                title="Novo Patrimônio"
                linkPrev="/" />

                <Main>
                    <Form
                        addNew={() => setIsOpenOwner(!isOpenOwner)}
                        labelButton="+ Novo Proprietário"
                        legend="Proprietário">
                        <Dialog 
                            isOpen={isOpenOwner}
                            onIsOpenChange={(isOpen: boolean) => setIsOpenOwner(isOpen)}
                            labelButton="Salvar novo Proprietário"
                            onClickButton={(e) => handleCreateOwner(e)}
                        >
                            <div className="new-owner-block">
                                <Input
                                    name="owner"
                                    label="Novo Proprietário"
                                    value={ownerDialog}
                                    onChange={(e) => setOwnerDialog(e.target.value)}
                                />

                                <NewButton
                                    isOpen={isOpenOwner}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsOpenSector(!isOpenSector)
                                    }}
                                />
                                
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
                            </div>
                        </Dialog>
                        <div className="owner-block">
                            <Select
                                name="owner"
                                label="Proprietário"
                                options={optionsOwner}
                                value={ownerId}
                                onChange={(e) => setOwnerId(e.target.value)}
                            />

                            <Select
                                name="sector"
                                label="Setor"
                                options={optionsSector}
                                value={sectorId}
                                onChange={(e) => setSectorId(e.target.value)} 
                            />
                        </div>
                    </Form>

                    <Form
                        legend="Patrimônio">
                        <div className="patrimony-block">
                            
                            <NewButton
                                isOpen={isOpenOwner}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpenType(!isOpenType)
                                }}
                            />
                            <div className="new-type-dialog">
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
                        
                            <Select
                                name="type"
                                label="Tipo"
                                options={[
                                    { value: '1', label: 'Computador' },
                                    { value: '2', label: 'Impressora' }
                                ]}
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
                        </div>

                    </Form>
                   
                    <button className="button-collapse" onClick={(e) => setIsOpenIp(!isOpenIp)}>
                        Adicionar Ip
                    </button>
                    <Collapse isOpen={isOpenIp}>
                        <Form 
                            legend="Ips"
                            addNew={addNewIpItem}
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
                        <button onSubmit={() => handleCreatePatrimony}>
                            Salvar Patrimônio
                        </button>
                    </Footer>   
                    
                </Main>
        </div>
    )
}

export default PatrimonyForm