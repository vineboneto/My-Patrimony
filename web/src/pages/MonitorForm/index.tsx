import React, {  MouseEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Form from '../../components/Form'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import MonitorItem from '../../components/MonitorItem'
import Footer from '../../components/Footer'

import printerIcon from '../../assets/images/icons/printerIcon.svg'
import powerIcon from '../../assets/images/icons/powerIcon.svg'

import './styles.css'

interface MonitorFormProps {
    owner: string
    sector: string
}

const MonitorForm: React.FC<MonitorFormProps> = () => {
    
    const location = useLocation<MonitorFormProps>()
    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')

    const [monitorItems, setMonitorItems] = useState([
        { patrimony: '', model: '', inch: '', description: '' }
    ])



    function setMonitorItemValue(position: number, field: string, value: string) {
        const updateMonitorItem = monitorItems.map((monitorItem, index ) => {
            if (index === position) {
                return { ...monitorItem, [field]: value  }
            }

            return monitorItem
        })
        setMonitorItems(updateMonitorItem)
    }

    function addNewMonitorItem() {
        setMonitorItems([
            ...monitorItems,
            { patrimony: '', model: '', inch: '', description: '' }
        ])
    }

    async function handleCreateMonitor(e: MouseEvent) {
        e.preventDefault()
    }    

    useEffect(() => {
        setSector(location.state.sector)
        setOwner(location.state.owner) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
     

    return (
        <div id="page-monitor-form">
            <PageHeader
                title="Cadastre o Monitor..."
                linkPrev="/computer-register"/>

            <Main>
                <Form legend="Proprietário">
                    <OwnerItem
                        owner={owner}
                        sector={sector}
                        readOnly={true}
                    />
                </Form>
                <Form 
                    legend="Monitores"
                    addNew={addNewMonitorItem}
                    labelButton="+ Novo Monitor">
                    
                    
                    {monitorItems.map((monitorItem, index) => {
                        return (
                            <MonitorItem
                                key={index}
                                monitorItem={monitorItem}
                                onChangePatrimony={(patrimony: string) => setMonitorItemValue(index, 'patrimony', patrimony)}
                                onChangeModel={(model: string) => setMonitorItemValue(index, 'model', model)}
                                onChangeInch={(inch: string) => setMonitorItemValue(index, 'inch', inch)}
                                onChangeDescription={(description: string) => setMonitorItemValue(index, 'description', description)} />
                        )
                    })}
                </Form>

                <Footer  
                    toNext={{ pathname: '/' }}
                    toPrev={{ pathname: '/computer-register', state: { owner, sector } }}
                    iconPrev={powerIcon}
                    iconNext={printerIcon}
                    labelButtonSave="Salvar Monitores"
                    handleButton={(e: MouseEvent) => handleCreateMonitor(e)} />
                
            </Main>
        </div>
    )
}

export default MonitorForm