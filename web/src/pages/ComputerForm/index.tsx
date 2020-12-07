import React, { useState } from 'react'

import Footer from '../../components/Footer'
import Form from '../../components/Form'
import Input from '../../components/Input'
import IpItems from '../../components/IpItems'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'

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
                        onOwnerChange={(owner: string) => setOwner(owner)} />

                </Form>

                <Form legend="Computador">
                    <div className="computer-item">
                        <Input
                            name="patrimony"
                            label="Patrimônio"
                            value={patrimony}
                            onChange={(e) => setPatrimony(e.target.value)} />
                        <Input
                            name="model"
                            label="Modelo"
                            value={model}
                            onChange={(e) => setModel(e.target.value)} />

                        <Textarea
                            name="description"
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="ips">
                        <div className="legend">
                            Ips
                            <button type="button" onClick={addNewIpItem}>
                                + Novo Ip
                            </button>
                        </div>
                    
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
                    </div>
                </Form>

                <Footer next="/" />
            </main>
        </div>
    )
}

export default ComputerForm 