import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Form from '../../components/Form'

import Main from '../../components/Main'
import OwnerItem from '../../components/OwnerItem'
import PageHeader from '../../components/PageHeader'

import './styles.css'

interface OwnerLocationProps {
    owner: string
    sector: string
}

const PrinterForm = () => {
    
    const location = useLocation<OwnerLocationProps>()
    const [sector, setSector] = useState('')
    const [owner, setOwner] = useState('')

    useEffect(() => {
        setSector(location.state.sector)
        setOwner(location.state.owner)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="page-printer-form">
            <PageHeader 
                title="Cadastre a Impressora..."
                linkPrev={{ pathname: '/monitor-register', state: { owner, sector } }}
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
                </Main>
        </div>
    )
}

export default PrinterForm