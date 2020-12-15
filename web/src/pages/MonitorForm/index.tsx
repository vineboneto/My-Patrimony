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
    ownerProps: {
        owner: string,
        owner_id: number
    },
    sectorProps: string
    readOnly: boolean
}

const MonitorForm: React.FC<MonitorFormProps> = ({ readOnly }) => {
    
    const location = useLocation<MonitorFormProps>()
    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')

    const [monitorItems, setMonitorItems] = useState([
        { patrimony: '', model: '', inch: '', description: '' }
    ])

    // const [patrimony, setPatrimony] = useState('')
    // const [model, setModel] = useState('')
    // const [inch, setInch] = useState('')
    // const [description, setDescription] = useState('')

    setReadOnly()

    function setReadOnly() {
        if (location.state.sectorProps && location.state.ownerProps.owner) {
            readOnly = true
        }
    }


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
        console.log(location.state.ownerProps.owner_id)
        setSector(location.state.sectorProps)
        setOwner(location.state.ownerProps.owner) 
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
                        sector={sector}
                        value={sector}
                        owner={owner}
                        onOwnerChange={(owner: string) => setOwner(owner)}
                        onChange={(e) => setSector(e.target.value)}
                        readOnly={readOnly}  
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
                    toPrev={{ pathname: '/computer-register' }}
                    iconPrev={powerIcon}
                    iconNext={printerIcon}
                    labelButtonSave="Salvar Monitores"
                    handleButton={(e: MouseEvent) => handleCreateMonitor(e)} />
                
            </Main>
        </div>
    )
}

export default MonitorForm