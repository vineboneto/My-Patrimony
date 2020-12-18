import React, { MouseEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Footer from '../../components/Footer'
import Form from '../../components/Form'
import IpItems from '../../components/IpItem'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import PrinterItem from '../../components/PrinterItem'

import monitorIcon from '../../assets/images/icons/monitorIcon.svg'
import stabIcon from '../../assets/images/icons/stabIcon.svg'

import './styles.css'
import api from '../../services/api'

interface OwnerLocationProps {
    owner: string
    sector: string
}

const PrinterForm: React.FC = () => {
    
    const location = useLocation<OwnerLocationProps>()
    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' } 
    ])
    

    useEffect(() => {
        setSector(location.state.sector)
        setOwner(location.state.owner)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    async function handleCreatePrinter(e: MouseEvent) {
        e.preventDefault()

        api.post('/printers', {
            patrimony,
            model,
            description,
            owner_id: parseInt(owner),
            ips: ipItems
        }).then(() => {
            alert('Impressora Cadastrada!')
        }).catch(() => {
            alert('Erro ao realizar cadasatro!')
        }) 
    }

    return (
        <div id="page-printer-form">
            <PageHeader 
                title="Cadastre a Impressora..."
                linkPrev={{ 
                    pathname: '/monitor-register', 
                    state: { owner, sector }
                 }}
            />

            <Main>
                <Form
                    legend="Proprietário">
                    <OwnerItem
                        sector={sector}
                        owner={owner}
                        readOnly={true} 
                    />
                </Form>
                <Form
                    legend="Impressora">
                    <PrinterItem
                        printerProps={{ patrimony, model, description }}
                        onChangePatrimony={(patrimony: string) => setPatrimony(patrimony)}
                        onChangeModel={(model: string) => setModel(model)}
                        onChangeDescription={(description: string) => setDescription(description)}
                    />
                </Form>

                <Form
                    legend="Ips"
                    labelButton="+ Novo Ip"
                    addNew={addNewIpItem}>
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
                    toNext={{
                        pathname: '/stabiliser-register',
                        state: { owner, sector }
                    }}
                    toPrev={{
                        pathname: '/monitor-register',
                        state: { owner, sector }
                    }}
                    iconPrev={monitorIcon}
                    iconNext={stabIcon}
                    labelButtonSave="Salvar Impressora"
                    handleButton={(e: MouseEvent) => handleCreatePrinter(e)}
                />
            </Main>
        </div>
    )
}

export default PrinterForm