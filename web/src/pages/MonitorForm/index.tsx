import React, {  useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Form from '../../components/Form'
import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import Input from '../../components/Input'

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

    if (location.state.sectorProps && location.state.ownerProps) {
        readOnly = true
    }

    const locationProps  = useCallback(() => {
        setSector(location.state.sectorProps)
        setOwner(location.state.ownerProps) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => locationProps, [locationProps])
     

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
                    <Input
                        name="patrimony"
                        label="Patrimônio"
                        value={patrimony}
                        onChange={(e) => setPatrimony(e.target.value)} 
                    />
                </Form>
            </Main>
        </div>
    )
}

export default MonitorForm