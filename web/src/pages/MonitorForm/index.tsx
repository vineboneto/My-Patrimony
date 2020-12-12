import React, {  useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Form from '../../components/Form'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import MonitorItem from '../../components/MonitorItem'

import './styles.css'

interface MonitorFormProps {
    ownerProps: string,
    sectorProps: string
    readOnly: boolean
}

const MonitorForm: React.FC<MonitorFormProps> = ({ readOnly }) => {
   
    const location = useLocation<MonitorFormProps>()
    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')
    const [patrimony, setPatrimony] = useState('')
    const [model, setModel] = useState('')
    const [inch, setInch] = useState('')
    const [description, setDescription] = useState('')

    if (location.state.sectorProps && location.state.ownerProps) {
        readOnly = true
    }

    useEffect(() => {
        setSector(location.state.sectorProps)
        setOwner(location.state.ownerProps) 
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
                <Form legend="Monitor">
                    <MonitorItem
                        monitorItem={{ patrimony, model, inch, description }}
                        onChangePatrimony={(patrimony: string) => setPatrimony(patrimony)}
                        onChangeModel={(model: string) => setModel(model)}
                        onChangeInch={(inch: string) => setInch(inch)}
                        onChangeDescription={(description: string) => setDescription(description)} />

                </Form>
            </Main>
        </div>
    )
}

export default MonitorForm