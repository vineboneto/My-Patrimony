import React, { useState } from 'react'

import Footer from '../../components/Footer'
import Form from '../../components/Form'
import Input from '../../components/Input'
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

                    <div className="owner-item">
                        <Select
                            name="sector"
                            label="Setor"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            options={[
                                { value: 'UPA', label: 'UPA' }
                            ]} />

                        <Input
                            name="owner"
                            label="Usuário"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)} />
                    </div>
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
                                <div key={index} className="ip-items">
                                    <Input 
                                        name="ip"
                                        label="Ip"
                                        value={ipItem.ip}
                                        onChange={(e) => setIpItemsValue(index, 'ip', e.target.value)}/>
                                    <Input
                                        name="mask"
                                        label="Máscara de sub-rede"
                                        value={ipItem.mask}
                                        onChange={(e) => setIpItemsValue(index, 'mask', e.target.value)} />
                                    <Input
                                        name="gateway"
                                        label="Gateway"
                                        value={ipItem.gateway}
                                        onChange={(e) => setIpItemsValue(index, 'gateway', e.target.value)} />
                                </div>
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