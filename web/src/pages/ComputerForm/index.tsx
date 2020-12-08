import React, { useState } from 'react'
import ComputerItem from '../../components/ComputerItem'

import Footer from '../../components/Footer'
import Form from '../../components/Form'
import IpForm from '../../components/IpForm'
import IpItems from '../../components/IpItem'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'


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

    return (
        <div id="page-computer-form">
            <PageHeader
                title="Cadastre o computador..." />

            <main>
                <Form legend="Proprietário">

                    <OwnerItem
                        sector={sector}
                        owner={owner}
                        onSectorChange={(sector: string) => setSector(sector)}
                        onOwnerChange={(owner: string) => setOwner(owner)}
                    />

                </Form>

                <Form legend="Computador">
                    <ComputerItem
                        computerItem={{ patrimony: patrimony, model: model, description: description }}
                        onDescriptionChange={(description: string) => setDescription(description)}
                        onModelChange={(model: string) => setModel(model)}
                        onPatrimonyChange={(patrimony: string) => setPatrimony(patrimony)} />
                    {/* Optou-se por criar um IpForm ao inves de utiliza o componente Form,
                    pois o mozila não suporta display flex na tag legend */}
                    <IpForm
                        addNewIp={addNewIpItem}>

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
                    </IpForm>
                    
                    
                </Form>

                <Footer next="/" />
            </main>
        </div>
    )
}

export default ComputerForm 