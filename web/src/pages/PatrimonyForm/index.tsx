import React, { MouseEvent, useEffect, useState } from 'react'


import PageHeader from '../../components/PageHeader'
import IpItems from '../../components/IpItem'
import Form from '../../components/Form'
import Main from '../../components/Main'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Footer from '../../components/Footer'
import api from '../../services/api'

import './styles.css'

const PatrimonyForm: React.FC = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [type, setType] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const isIp = true

    const [optionsOwner, setOptionsOwner] = useState([
        { value: '', label: '', sectorId: '' }
    ])
    const [optionsSector, setOptionsSector] = useState([
        { value: '', label: '' }
    ])

    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
    ])

    useEffect(() => {
        getDataOwner()
        getDataSector()
    }, [])

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

    function setIpItemsValue(position: Number, field: string, value: string) {
        const updateIpItems = ipItems.map((ipItem, index) => {
            if (index === position) {
                return { ...ipItem, [field]: value }
            }
            return ipItem
        })
        setIpItems(updateIpItems)
    }

    function addNewIpItem() {
        setIpItems([
            ...ipItems,
            { ip: '', mask: '', gateway: '' }
        ]);
    }



    return (
        <div id="page-patrimony-form">
            <PageHeader
                title="Novo Patrimônio"
                linkPrev="/" />

                <Main>
                    <Form
                        legend="Proprietário">
                        <div className="owner-block">
                            <Select
                                name="owner"
                                label="Proprietário"
                                options={optionsOwner}
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />

                            <Select
                                name="sector"
                                label="Setor"
                                options={optionsSector}
                                value={sector}
                                onChange={(e) => setSector(e.target.value)} 
                            />
                        </div>
                    </Form>

                    <Form
                        legend="Patrimônio">
                        <div className="patrimony-block">
                            <Select
                                name="type"
                                label="Tipo"
                                options={[
                                    { value: '1', label: 'Computador' },
                                    { value: '2', label: 'Impressora' }
                                ]}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
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
                    
                    {isIp  &&
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
                    }

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