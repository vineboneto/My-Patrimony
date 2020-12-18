import React, { MouseEvent, useEffect, useState } from 'react'

import ComputerItem from '../../components/ComputerItem'
import Footer from '../../components/Footer'
import Form from '../../components/Form'
import IpItems from '../../components/IpItem'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'
import Main from '../../components/Main'


import monitorIcon from '../../assets/images/icons/monitorIcon.svg'
import profileIcon from '../../assets/images/icons/profileIcon.svg'

import api from '../../services/api'

import './styles.css'
import { useHistory, useLocation } from 'react-router-dom'

interface OwnerFormProps {
        owner: string,
        sector: string
}

const ComputerForm: React.FC = () => {

    const location = useLocation<OwnerFormProps>()
    const [owner, setOwner] = useState('')
    const [sector, setSector] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
    ])

    const history = useHistory<OwnerFormProps>()

    
    
    useEffect(() => {
        setOwner(location.state.owner)
        setSector(location.state.sector)
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

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()

        api.post('/computers', {
            patrimony: patrimony,
            model: model,
            description: description,
            owner_id: owner,
            ips: ipItems
        }).then(() => {
            alert('Computador cadastrado')
            history.push({
                pathname: '/monitor-register',
                state: { owner, sector }
            })
        }).catch(() => alert('Erro ao cadastrar!'))
    }


    return (
        <div id="page-computer-form">
            <PageHeader
                title="Cadastre o computador..."
                linkPrev="/owner-register"/>

            <Main>
                <Form legend="Proprietário">

                    <OwnerItem
                        owner={owner}
                        sector={sector}
                        readOnly={true}
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
                    toNext={
                        { 
                            pathname: '/monitor-register', state: {
                                 sector, owner }
                        }
                    }
                    toPrev={
                        {
                            pathname: "/owner-register", state: {
                                sector, owner }
                        }
                    }
                    iconPrev={profileIcon}
                    iconNext={monitorIcon}
                    labelButtonSave="Salvar computador"
                    handleButton={(e: MouseEvent) => handleCreateOwner(e)} />

            </Main>
        </div>
    )
}

export default ComputerForm 