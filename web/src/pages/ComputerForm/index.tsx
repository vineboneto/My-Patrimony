import React, { MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ComputerItem from '../../components/ComputerItem'
import Footer from '../../components/Footer'
import Form from '../../components/Form'
import IpForm from '../../components/IpForm'
import IpItems from '../../components/IpItem'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'


import monitorIcon from '../../assets/images/icons/monitorIcon.svg'
import nextIcon from '../../assets/images/icons/nextIcon.svg'


import './styles.css'
import api from '../../services/api'

const ComputerForm = () => {

    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [ipItems, setIpItems] = useState([
        { ip: '', mask: '', gateway: '' }
    ])
    const [options, setOptions] = useState([
        { value: '', label: '' }
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

    useEffect(() => {
        getDataSector()
    }, [])
    

    async function getDataSector() {
        const response =  await api.get('sectors')
        const datas = response.data
        

        const options = datas.map((data: any) => {
            return {
                value: data.id,
                label: data.name
            }
        })
        setOptions(options)
    }

    async function handleCreateOwner(e: MouseEvent) {
        e.preventDefault()
        api.post('/owners', {
            name: owner,
            sector_id: parseInt(sector)
        }).then(() => {
            alert('Propriétario cadastro')
        }).catch(() => alert('Erro ao cadastrar!'))
    }



    return (
        <div id="page-computer-form">
            <PageHeader
                title="Cadastre o computador..." />

            <main>
                <Form legend="Proprietário">

                    <OwnerItem
                        options={options}
                        sector={sector}
                        owner={owner}
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
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

                <Footer>
                    <button onClick={handleCreateOwner} >
                        Salvar Patrimônio
                    </button>

                    <div className="link-next">
                        <Link to="/">
                            <img src={monitorIcon} alt="Monitor"/>
                            <img src={nextIcon} alt="Proxíma pagína"/>
                        </Link>
                    </div>
                </Footer>
            </main>
        </div>
    )
}

export default ComputerForm 