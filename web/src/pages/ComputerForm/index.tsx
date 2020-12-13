import React, { MouseEvent, useState } from 'react'

import ComputerItem from '../../components/ComputerItem'
import Footer from '../../components/Footer'
import Form from '../../components/Form'
import IpForm from '../../components/IpForm'
import IpItems from '../../components/IpItem'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import Main from '../../components/Main'


import monitorIcon from '../../assets/images/icons/monitorIcon.svg'

import api from '../../services/api'

import './styles.css'

const ComputerForm = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
    ])

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

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()
        api.post('/owners', {
            name: owner,
            sector_id: parseInt(sector),
            patrimony: patrimony,
            model: model,
            description: description,
            ips: ipItems
        }).then(() => {
            alert('Computador cadastrado')
        }).catch(() => alert('Erro ao cadastrar!'))
    }

    return (
        <div id="page-computer-form">
            <PageHeader
                title="Cadastre o computador..."
                linkPrev="/"/>

            <Main>
                <Form legend="Proprietário">

                    <OwnerItem
                        sector={sector}
                        owner={owner}
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        onOwnerChange={(owner: string) => setOwner(owner)}
                    />

                </Form>

                <Form legend="Computador">
                    <ComputerItem
                        computerItem={{ patrimony, model, description }}
                        onDescriptionChange={(description: string) => setDescription(description)}
                        onModelChange={(model: string) => setModel(model)}
                        onPatrimonyChange={(patrimony: string) => setPatrimony(patrimony)} />
                </Form>

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

                <Footer
                    toNext={{ pathname: '/monitor-register', state: { sectorProps: sector, ownerProps: owner } }}
                    iconNext={monitorIcon}
                    labelButtonSave="Salvar computador"
                    handleButton={(e: MouseEvent) => handleCreateOwner(e)} />

            </Main>
        </div>
    )
}

export default ComputerForm 